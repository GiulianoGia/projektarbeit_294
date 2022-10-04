import router from "@/router";
import axios from "axios";
import TaskI from "types/TaskI";
import { defineComponent } from "vue";

axios.defaults.withCredentials = true;

export default defineComponent({
    name: "SingleView",
    data() {
        return {
            update: 0,
            param: this.$route.params,
            task: {} as TaskI,
        };
    },
    mounted() {
        if (this.getCookie("login") === "true") {
            axios
                .get(`http://localhost:3000/auth/cookie/task/${this.param.id}`)
                .then((response) => {
                    this.task = response.data;
                }).catch((error) => {
                    router.push("/home");
                });
        } else {
            window.alert("Bitte zuerst einloggen!");
            router.push("/");
        }
    },
    methods: {
        /**
         * @Info to get a random cookie
         * @param cName name of the cookie you want to access
         * @returns the value of the cookie
         */
        getCookie(cName: string) {
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); //to be careful
            const cArr = cDecoded.split("; ");
            let res;
            cArr.forEach((val) => {
                if (val.indexOf(name) === 0) res = val.substring(name.length);
            });
            return res;
        },
        /**
         * @Info deletes an task 
         * @param index id of the task
         * @param task task object
         */
        deleteTask(index: number, task: TaskI) {
            axios
                .delete(`http://localhost:3000/auth/cookie/task/${task.id}`)
                .then((response) => {
                    if (response.status === 200) {
                        window.alert("Die Aufgabe konnte gelöscht werden!");
                        router.push("/home");
                    }
                })
                .catch((error) => {
                    window.alert("Etwas hat nicht funktioniert!");
                });
        },
        /**
         * @Info sets the completed attribute to true or false
         * @param task task object
         */
        completeTask(task: TaskI) {
            task.completed = !task.completed;
            axios
                .put("http://localhost:3000/auth/cookie/tasks", {
                    id: task.id,
                    completed: task.completed,
                    title: task.title,
                })
                .then((response) => {
                    if (response.status === 200) {
                        window.alert("Die Aufgabe konnte angepasst werden!");
                    }
                })
                .catch((error) => {
                    window.alert("Etwas hat nicht funktioniert!");
                });
        },
        /**
         * @Info changes the title of an object
         * @param task task object
         */
        changeTask(task: TaskI) {
            if (this.update === task.id) {
                const input = (<HTMLInputElement>document.getElementById(task.id.toString()))?.value;
                if (input !== '') {
                    axios.put('http://localhost:3000/auth/cookie/tasks', { id: task.id, completed: task.completed, title: input }).then((response) => {
                        if (response.status === 200) {
                            window.alert("Die Aufgabe konnte geändert werden!");
                            this.update = 0;
                            location.reload();
                        }
                    }).catch((error) => {
                        window.alert("Etwas hat nicht funktioniert!");
                    });
                } else {
                    this.update = 0;
                }
            } else {
                this.update = task.id;
            }

        },
    },
});
