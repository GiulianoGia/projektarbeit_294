import { defineComponent } from 'vue';
import { User } from 'types/User';
import axios from 'axios';

export default defineComponent({
    name: "login",
    data() {
        return {
            error: false,
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            if (this.user.email !== '' && this.user.password !== '') {
                axios.post('http://localhost:3000/auth/cookie/login', {
                    email: this.user.email,
                    password: this.user.password
                }).then((response => {
                    console.log(response);
                }));
            } else {
                this.error = true;
            }
        }
    }
})