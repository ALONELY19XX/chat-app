<template>
   <div>
      <ul class="message-list">
         <li v-for="(message, index) in chatMessages" :key="'msg' + index">
            {{ message.message + ` (${message.createdAt})` }}
         </li>
      </ul>
   </div>
   <div class="inputs">
      <input type="text" placeholder="Message..." v-model="inputValue" />
      <button @click="sendMessage">Send</button>
      <button @click="getMessages">Get All Messages</button>
   </div>
</template>

<script>
import { io } from 'socket.io-client'
import { ref, onMounted } from 'vue'

export default {
   setup() {
      const socket = ref(null)
      const inputValue = ref('')
      const chatMessages = ref([])

      onMounted(() => {
         socket.value = io('http://localhost:3000')

         socket.value.on('new message', msg => {
            chatMessages.value.push(msg)
         })
      })

      const sendMessage = () => {
         if (inputValue.value !== '') {
            socket.value.emit('chat message', inputValue.value)
            inputValue.value = ''
         }
      }

      const getMessages = async () => {
         const response = await fetch('http://localhost:3000/logs')
         const json = await response.json()
         chatMessages.value = json
      }

      return {
         inputValue,
         chatMessages,
         sendMessage,
         getMessages,
      }
   },
}
</script>

<style scoped>
.logo {
   height: 6em;
   padding: 1.5em;
   will-change: filter;
}
.logo:hover {
   filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
   filter: drop-shadow(0 0 2em #42b883aa);
}
.inputs {
   display: flex;
   width: 100%;
   justify-content: center;
   position: absolute;
   bottom: 40px;
}
.inputs > input {
   width: 600px;
}
</style>
