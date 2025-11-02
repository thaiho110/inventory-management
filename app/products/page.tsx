
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function AddProduct() {
    const user = await getCurrentUser();
    return (
        <div className="min-h-screen max-w-full">
            <main className="p-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Add product</h1>
                            <p>Add a new product to your inventory</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <form className="space-y-6" action={createProduct}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name*
                                </label>
                                <input type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                        placeholder="Enter product name"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                        Price*
                                    </label>
                                    <input type="number"
                                            id="price"
                                            name="price"
                                            step="0.01"
                                            min="0"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                            placeholder="Enter product price (e.g: 100)"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantity*
                                    </label>
                                    <input type="number"
                                            id="quantity"
                                            name="quantity"
                                            step="1"
                                            min="0"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                            placeholder="Enter product quantities (e.g: 10)"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                                        SKU
                                    </label>
                                    <input type="text"
                                            id="sku"
                                            name="sku"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                            placeholder="Enter product SKU"
                                    />
                            </div>
                            <div>
                                <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700 mb-2">
                                        Low Stock Threshold (Optional)
                                    </label>
                                    <input type="number"
                                            id="lowStockThreshold"
                                            name="lowStockThreshold"
                                            step="1"
                                            min="0"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"
                                            placeholder="Enter low stock threshold"
                                    />
                            </div>
                            <div className="flex gap-5">
                                <button type="submit" className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 text-white">Add product</button>
                                <Link href="/inventory" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-400">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}