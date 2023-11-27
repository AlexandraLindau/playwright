import { Locator, Page } from "@playwright/test";
import IProduct from "../../models/IProduct";
import BasePage from "../BasePage";

abstract class ProductDetails extends BasePage {
    products: Locator;
    baseProductSelector: string;
    productTitleSelector: string;
    productDescriptionSelector: string;
    productPriceSelector: string;
    productButtonSelector: string;

    constructor(page: Page, baseProductSelector: string) {
        super(page);
        this.products = this.page.locator(baseProductSelector);
        this.baseProductSelector = baseProductSelector;
        this.productTitleSelector = 'inventory_item_name';
        this.productDescriptionSelector = 'inventory_item_desc';
        this.productPriceSelector = 'inventory_item_price';
        this.productButtonSelector = 'button';
    }

    abstract getProductTitle(index: number): Locator;

    abstract getProductDescription(index: number): Locator;

    abstract getProductPrice(index: number): Locator;

    abstract getProductButton(index: number): Locator;

    async getProductByIndex(index: number): Promise<IProduct> {
        const title = await this.getProductTitle(index).innerText();
        const description = await this.getProductDescription(index).innerText();
        const price = await this.getProductPrice(index).innerText();
        return { title, description, price };
    }

    async getProductsList() {
        return await this.products.all();
    }
}

export default ProductDetails;