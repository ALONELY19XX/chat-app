<template>
   <div
      class="chat-bubble"
      :class="{
         'my-message': isMessageFromThisUser,
         'others-message': !isMessageFromThisUser,
      }"
      :style="{
         'margin-left': !isMessageFromThisUser ? 'auto' : null,
      }"
   >
      <div>
         {{ message }}
      </div>
      <div class="info">{{ `${user} @ ${formatTimestamp(timestamp)}` }}</div>
      <div
         class="bubble-start"
         :class="{
            'my-bubble': isMessageFromThisUser,
            'others-bubble': !isMessageFromThisUser,
         }"
      ></div>
   </div>
</template>

<script>
import { computed } from 'vue'
export default {
   props: {
      message: {
         type: String,
         require: true,
      },
      user: {
         type: String,
         require: true,
      },
      timestamp: {
         type: String,
         required: true,
      },
   },
   setup(props) {
      const isMessageFromThisUser = computed(() => {
         const thisUser = localStorage.getItem('chat-app-username')
         return props.user === thisUser
      })

      const formatTimestamp = ts => {
         const d = new Date(ts)
         return (
            d.getDate() +
            '-' +
            (d.getMonth() + 1) +
            '-' +
            d.getFullYear() +
            ' ' +
            d.getHours() +
            ':' +
            d.getMinutes()
         )
      }

      return { isMessageFromThisUser, formatTimestamp }
   },
}
</script>

<style scoped>
.chat-bubble {
   position: relative;
   padding: 0.5em 1em;
   border-radius: 10px;
   max-width: 500px;
   width: fit-content;
   margin-bottom: 10px;
}
.my-message {
   background-color: #32b354;
}
.others-message {
   background-color: #3259b3;
}
.info {
   font-size: 0.8em;
   opacity: 0.8;
   text-align: end;
}
.bubble-start {
   transform: rotate(45deg);
   width: 14px;
   height: 14px;
   position: absolute;
   bottom: 15px;
}

.my-bubble {
   left: -5px;
   background-color: #32b354;
}
.others-bubble {
   right: -5px;
   background-color: #3259b3;
}
</style>
