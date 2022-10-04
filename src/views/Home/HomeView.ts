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
        /**
         * @Info deletes an task 
         * @param index id of the task
         * @param task task object
         */
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
        /**
         * @Info sets the completed attribute to true or false
         * @param task task object
         */
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
        /**
         * @Info creates a new task (completed is always false in default)
         */
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
        /**
         * @Info changes the title of an object
         * @param task task object
         */
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
        /**
         * @Info Gets all task from the backend (reactive)
         */
        getAllTask() {
            axios.get("http://localhost:3000/auth/cookie/tasks").then((reponse) => {
                if (reponse.status === 200) {
                    this.taskList = reponse.data;
                }
            }).catch((error) => {
                window.alert("Etwas hat nicht funktioniert!");
            });
        },
        /**
         * @Info to get a random cookie
         * @param cName name of the cookie you want to access
         * @returns the value of the cookie
         */
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
        /**
         * @Info logout the user
         */
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