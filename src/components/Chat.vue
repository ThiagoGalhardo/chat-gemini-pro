<template>
  <div class="q-pa-md">
    <h4 class="text-weight-light text-green-3 q-mb-md">Chat - Gemini 1.5 Pro</h4>
    <q-scroll-area ref="scrollAreaRef" style="height: 500px; max-width: 100%;">
      <q-chat-message v-for="(message, index) in  messages" :key="index" :name="message.sender" :avatar="message.avatar"
        text-html :text="[marked(message.content)]" :sent="message.sent" :bg-color="message.bgColor" text-color="white" />
      <q-btn v-if="errorChat" icon="refresh" stack color="blue" class="q-my-md" @click="reloadChat">Novo chat</q-btn>
      <q-chat-message v-if="loading" name="Gemini" avatar="https://cdn.quasar.dev/img/avatar.png" bg-color="secondary">
        <q-spinner-dots size="2rem" /> </q-chat-message>
    </q-scroll-area>
    <q-input dark standout="bg-teal text-white" v-model="newMessage" placeholder="Digite sua mensagem..."
      @keyup.enter="sendMessage">
      <template v-slot:after>
        <q-btn round dense flat icon="send" @click="sendMessage" :disabled="!newMessage" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { marked } from 'marked'
import { useGetGenerativeModelGP } from '../composables/useGetGenerativeModelGP.js'

const messages = ref([])
const newMessage = ref('')
const loading = ref(false)
const scrollAreaRef = ref(null)
const errorChat = ref(false)


const reloadChat = () => {
  location.reload()
}

const sendMessage = async () => {
  if (!newMessage.value) return

  const userMessage =
  {
    sender: 'Você',
    content: newMessage.value,
    sent: true, bgColor: 'grey',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
  }
  messages.value.push(userMessage)
  loading.value = true

  const tmp_message = ref(newMessage.value)
  newMessage.value = ''

  try {
    const response = await useGetGenerativeModelGP({
      prompt: tmp_message.value,
    })

    const botMessage =
    {
      sender: 'Gemini',
      content: response,
      sent: false,
      bgColor: 'secondary',
      avatar: 'https://cdn.quasar.dev/img/avatar.png'
    }
    messages.value.push(botMessage)
  } catch (error) {
    console.log({ error })

    if (error.status) {
      const botMessage =
      {
        sender: 'Gemini',
        content: "Ocorreu um erro e eu parei, vamos começar outro chat?",
        sent: false,
        bgColor: 'secondary',
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
        error: true
      }
      messages.value.push(botMessage)
      errorChat.value = true
    }
  } finally {
    loading.value = false
    newMessage.value = ''
    scrollAreaRef.value = 500
  }
}

</script>

<style scoped></style>
