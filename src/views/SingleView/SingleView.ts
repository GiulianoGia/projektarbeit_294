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
                });
        } else {
            window.alert("Bitte zuerst einloggen!");
            router.push("/");
        }
    },
    methods: {
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
