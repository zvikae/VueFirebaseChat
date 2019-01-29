
<template>
  <div class = 'main-app'>
		<div class="main-messages">
				<h3>Messages</h3>
				<div class="message" v-for="message in messages">
					<div class = 'msg-user'>{{message.username}} 
						<div class = 'msg-user-datetime'>{{formatDate(message.dateTime)}}</div>
					</div>
					<div class = 'msg-text'>{{message.text}}</div>
				</div>
		</div>
    <div class = 'main-settings' v-if="!username">
      <div class = 'title-no-username'>You can't chat without a name. What's your name?</div>
      <input class = 'username-text' type="text" placeholder="Name" v-on:keyup.enter="updateUsername">
    </div>
    <div v-else>
        From : {{username}}<br />
        Message:<br />
        <textarea name="" id="" cols="30" rows="10" placeholder="New Message" v-on:keyup.enter="sendMessage"></textarea>
    </div>
		<hr>
  </div>
</template>
<script>
import fire from './fire.js'
import moment from 'moment'
export default {
    name: 'app',
    data () {
      return {
				username: '',
				messages: []
      }
    },
    methods: {
			updateUsername(e) {
        e.preventDefault();
        if (e.target.value) {
          this.username = e.target.value;
				}
			},
			sendMessage(e) {
        e.preventDefault();
        if (e.target.value) {
					const message = {
						username: this.username,
						text: e.target.value,
						dateTime: (new Date()).toString()
					}
					//Push message to firebase reference
					fire.database().ref('messages').push(message);

					e.target.value = ''
        }
			},
			formatDate(dateTime) {
				return moment(dateTime).format('HH:mm, DD.MM.YYYY');
			}
    },
    mounted () {
			let vm = this;
			const itemsRef = fire.database().ref('messages');
			itemsRef.on('value', snapshot => {
				let data = snapshot.val();
				let messages = [];
				if (!data) return;
				Object.keys(data).forEach(key => {
						messages.push({
								id: key,
								username: data[key].username,
								text: data[key].text,
								dateTime: data[key].dateTime
						});
				});
				vm.messages = messages;
			});
    },
}
</script>

<style lang="scss" scoped>
.main-app {
	font-family: 'Roboto', sans-serif;
	border: 1px solid red;
	width: 70%;
	margin: 0 auto;
	.main-messages {
		.message {
			background-color: aquamarine;
			padding-bottom: 20px;
			margin-left: 10px;
			.msg-user {
				font-size: 14px;
				font-weight: 700;
				.msg-user-datetime {
					display: inline-block;
					margin-left: 5px;
					font-weight: 400;
					font-size: 12px;

				}
			}
			.msg-text {
				background: #3e1dbd;
				color: white;
				font-size: 15px;
				line-height: 15px;
				padding: 10px;
				width: 400px;
				border-radius: 5px;
				margin-top: 10px;
			}
		}
	}
	.main-settings {
		padding-top: 35px;
    border-top: 1px solid grey;
	}
}
</style>