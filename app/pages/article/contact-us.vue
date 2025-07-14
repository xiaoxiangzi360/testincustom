<template>
    <section class="px-6 py-12 max-w-3xl mx-auto text-gray-800">
        <h1 class="text-3xl font-bold mb-4">Contact Us</h1>

        <p class="mb-6">
            We’re here to help you design the perfect shade solution for your space.<br />
            Reach out anytime — we reply within 12 hours.
        </p>

        <div class="mb-6">
            <p class="font-semibold">Email:</p>
            <ul class="list-disc ml-6 text-blue-600">
                <li>
                    <a href="mailto:hello@incustom.com" class="hover:underline">hello@incustom.com</a>
                </li>
                <li>
                    <a href="mailto:service@incustom.com" class="hover:underline">service@incustom.com</a>
                </li>
            </ul>
        </div>

        <div class="mt-10">
            <h2 class="text-2xl font-semibold mb-2">Contact Form</h2>
            <p class="mb-4">Have a question or custom request? Tell us more.</p>

            <form class="space-y-4" @submit.prevent="handleSubmit">
                <div>
                    <label for="name" class="block font-medium mb-1">Name</label>
                    <input id="name" type="text" v-model="name"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>

                <div>
                    <label for="email" class="block font-medium mb-1">Email</label>
                    <input id="email" type="email" v-model="email"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2" />
                </div>

                <div>
                    <label for="message" class="block font-medium mb-1">Message</label>
                    <textarea id="message" rows="5" v-model="content"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2"></textarea>
                </div>

                <button type="submit" :disabled="isLoading"
                    class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
                    {{ isLoading ? 'Sending...' : 'Send Message' }}
                </button>
            </form>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const { createContactUs } = useAuth()

const name = ref('')
const email = ref('')
const content = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
    if (!name.value || !email.value || !content.value) {
        message.warning('Please fill in all fields.')
        return
    }

    isLoading.value = true
    try {
        await createContactUs({
            name: name.value,
            email: email.value,
            message: content.value,
        })
        message.success('Message sent successfully!')
        name.value = ''
        email.value = ''
        content.value = ''
    } catch (err) {
        console.error(err)
        message.error('Failed to send message. Please try again.')
    } finally {
        isLoading.value = false
    }
}
</script>


<style scoped>
/* You can adjust spacing or add transition styles here */
</style>
