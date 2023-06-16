import { createStore } from "vuex"
import sharePrice from "@/store/share-price";
import purchaseShare from "@/store/trading-share";
import stock from "@/store/stock";
import graphic from "@/store/graphic";
import admin from "@/store/admin";
import auth from "@/store/auth";

const store = createStore({
    modules: {
        sharePrice, purchaseShare, stock, graphic, admin, auth
    }
})

export default store
