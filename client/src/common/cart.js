export default class Cart {

    /**
     * 
     */
    constructor() {
        // Extract JSON cart string from local storage
        let cart = localStorage.getItem('cart');

        // Parse JSON cart String to `items` object
        this.items = (cart) ? JSON.parse(cart) : [];
    }

    /**
     * Getter method for items
     */
    getItems() {
        return this.items;
    }

    /**
     * Returns how many total ingrediants are in the cart
     */
    count() {
        let sum = 0;
        for (let key of Object.keys(this.items)) {
            sum += this.items[key].quantity;
        }
        return sum;
    }

    /**
     * Updates cart in localstorage
     */
    update() {
        localStorage.setItem('cart', JSON.stringify(this.items))
    }

    /**
     * Add a new ingreidant of the given id
     */
    add(ingrediant, quantity = 1) {

        // First see if ingrediant is already present
        let item = this.getItem(ingrediant)

        if (item) {
            // Ingrediant is in cart already; increment quantity by 1
            item.quantity += quantity;

        } else {
            // Ingrediant not in cart, add as new iingrediant
            this.items.push({
                ingrediant: ingrediant,
                quantity: quantity
            });
        }

        this.update();
    }

    /**
     * Remove an item from items via id
     */
    remove(ingrediant) {
        let item = this.getItem(ingrediant);

        let itemIndex = this.items.indexOf(item);

        if (ingrediant) {
            this.items.splice(itemIndex, 1);
            this.update();
        }
    }

    /**
     * Get an iingrediant from items via id
     * Returns null if item does not exist in items
     */
    getItem(recipeId) {
        return this.items.find(({ ingrediant }) => ingrediant === recipeId) || null;
    }
}