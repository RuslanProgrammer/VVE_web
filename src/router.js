import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import LoginAdministrator from "@/views/LoginAdministrator";
import LoginWorker from "@/views/LoginWorker";
import LoginCustomer from "@/views/LoginCustomer";
import RegisterAdministrator from "@/views/RegisterAdministrator";
import RegisterWorker from "@/views/RegisterWorker";
import RegisterCustomer from "@/views/RegisterCustomer";
import BackupsList from "@/components/BackupsList";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/loginAdministrator',
            component: LoginAdministrator
        },
        {
            path: '/loginWorker',
            component: LoginWorker
        },
        {
            path: '/loginCustomer',
            component: LoginCustomer
        },
        {
            path: '/registerAdministrator',
            component: RegisterAdministrator
        },
        {
            path: '/backups',
            component: BackupsList
        },
        {
            path: '/registerWorker',
            component: RegisterWorker
        },
        {
            path: '/registerCustomer',
            component: RegisterCustomer
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue')
        },
        {
            path: "/checkouts/add/",
            name: "Checkout-add",
            component: () => import("./components/AddCheckout")
        },
        {
            path: "/checkouts",
            name: "Checkouts",
            component: () => import("./components/CheckoutList")
        },
        {
            path: "/checkouts/:id",
            name: "Checkout-details",
            component: () => import("./components/Checkout")
        },
        {
            path: "/reservations/add/:id",
            name: "Reservation-add",
            component: () => import("./components/AddReservation")
        },
        {
            path: "/reservations",
            name: "Reservations",
            component: () => import("./components/ReservationList")
        },
        {
            path: "/reservations/:id",
            name: "Reservation-details",
            component: () => import("./components/Reservation")
        },
    ]

})
router.beforeEach((to, from, next) => {
    const publicPages = ['/loginAdministrator', '/registerAdministrator', '/loginWorker', '/registerWorker', '/loginCustomer', '/registerCustomer', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/loginAdministrator');
    } else {
        next();
    }
});

export default router;




