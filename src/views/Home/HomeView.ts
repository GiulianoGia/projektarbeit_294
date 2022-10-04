import { defineComponent } from "vue";
import TaskI from "types/TaskI";
import axios from "axios";
import router from "@/router";

axios.defaults.withCredentials = true

export default defineComponent({
    name: 'HomeView',
    components: {
    },
    data() {
        return {
            loggedIn: false,
            title: '',
            taskList: [] as TaskI[],
            update: 0,
        }
    },
    methods: {
        deleteTask(index: number, task: TaskI) {
            axios.delete(`http://localhost:3000/auth/cookie/task/${task.id}`).then((response) => {
                this.getAllTask();
                if (response.status === 200) {
                    window.alert("Die Aufgabe konnte gelöscht werden!");
                }
            }).catch((error) => {
                window.alert("Etwas hat nicht funktioniert!");
            });
        },
        completeTask(task: TaskI) {
            task.completed = !task.completed
            axios.put('http://localhost:3000/auth/cookie/tasks', { id: task.id, completed: task.completed, title: task.title }).then((response) => {
                if (response.status === 200) {
                    window.alert("Die Aufgabe konnte angepasst werden!");
                }
            }).catch((error) => {
                window.alert("Etwas hat nicht funktioniert!");
            });
        },
        createTask() {
            if (this.title !== '') {
                axios.post('http://localhost:3000/auth/cookie/tasks', { completed: false, title: this.title }).then((response) => {
                    if (response.status === 200) {
                        window.alert("Eine Aufgabe konnte erstellt werden");
                    }
                }).catch((error) => {
                    window.alert("Etwas hat nicht funktioniert!");
                });
            } else {
                window.alert("Please fill in all the forms!");
            }
        },
        changeTask(task: TaskI) {
            if (this.update === task.id) {
                const input = (<HTMLInputElement>document.getElementById(task.id.toString()))?.value;
                if (input !== '') {
                    axios.put('http://localhost:3000/auth/cookie/tasks', { id: task.id, completed: task.completed, title: input }).then((response) => {
                        this.getAllTask();
                        if (response.status === 200) {
                            window.alert("Die Aufgabe konnte geändert werden!");
                            this.update = 0;
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
        getAllTask() {
            axios.get("http://localhost:3000/auth/cookie/tasks").then((reponse) => {
                if (reponse.status === 200) {
                    this.taskList = reponse.data;
                }
            }).catch((error) => {
                window.alert("Etwas hat nicht funktioniert!");
            });
        },
        getCookie(cName: string) {
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie); //to be careful
            const cArr = cDecoded.split('; ');
            let res;
            cArr.forEach(val => {
                if (val.indexOf(name) === 0) res = val.substring(name.length);
            })
            return res
        },
        logout() {
            axios.post('http://localhost:3000/auth/cookie/logout').then((response) => {
                document.cookie = "login=false";
                router.push("/");
            })
        }
    },
    mounted() {
        if (this.getCookie('login') === 'true') {
            this.loggedIn = true;
            this.getAllTask();
        } else {
            this.loggedIn = false;
            window.alert("Bitte zuerst einloggen!");
            router.push("/");
        }
    },
});