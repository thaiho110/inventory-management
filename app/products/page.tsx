
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default async function AddProduct() {
    const user = await getCurrentUser();
    return (
        <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 min-h-screen">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <Link href="/inventory" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Inventory
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Create a new product entry in your inventory system</p>
                </div>

                <div className="max-w-3xl">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-sm">
                        <form className="space-y-8" action={createProduct}>
                            {/* Product Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="e.g., Professional Wireless Mouse"
                                />
                            </div>

                            {/* Price and Quantity Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">$</span>
                                        <input 
                                            type="number"
                                            id="price"
                                            name="price"
                                            step="0.01"
                                            min="0"
                                            required
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                        Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        step="1"
                                        min="0"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter quantity"
                                    />
                                </div>
                            </div>

                            {/* SKU */}
                            <div>
                                <label htmlFor="sku" className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    SKU (Stock Keeping Unit) <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text"
                                    id="sku"
                                    name="sku"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="e.g., WM-PRO-001"
                                />
                            </div>

                            {/* Low Stock Threshold */}
                            <div>
                                <label htmlFor="lowStockThreshold" className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                    Low Stock Threshold
                                </label>
                                <input 
                                    type="number"
                                    id="lowStockThreshold"
                                    name="lowStockThreshold"
                                    step="1"
                                    min="0"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Alert when stock falls below this number"
                                />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Leave blank or set to 0 to disable low stock alerts</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                                <button 
                                    type="submit" 
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Product
                                </button>
                                <Link 
                                    href="/inventory" 
                                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}