import { defineComponent } from "vue";
import { User } from "types/User";
import axios from "axios";
import router from "@/router";

export default defineComponent({
    name: "login",
    data() {
        return {
            error: false,
            errorMessage: '',
            user: {
                email: "",
                password: "",
            } as User,
        };
    },
    methods: {
        login() {
            if (this.user.email !== "" && this.validateEmail() && this.user.password !== "") {
                axios.post("http://localhost:3000/auth/cookie/login", {
                    email: this.user.email,
                    password: this.user.password,
                }).then((response) => {
                    if (response.status === 200) {
                        document.cookie = "login=true";
                        router.push("/home");
                    }
                }).catch(() => {
                    this.error = true;
                    this.errorMessage = "Passwort ist falsch!";
                });
            } else {
                this.error = true;
                if (this.user.email === '' || this.user.password === '') {
                    this.errorMessage = "Bitte fülle alles aus!";
                } else {
                    this.errorMessage = "Bitte setzte eine richtige Email!"
                }
            }
        },
        validateEmail() {
            return String(this.user.email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        reset() {
            this.user.email = "";
            this.user.password = "";
        },
    },
});
