import Pagination from '@/components/pagination';
import { deleteProduct} from '@/lib/actions/products';
import { getCurrentUser } from '@/lib/auth';
import {prisma} from '@/lib/prisma';
import React from 'react'
import Link from 'next/link';
import { Plus, Search, Trash2 } from 'lucide-react';

export default async function InventoryPage({searchParams}: {searchParams: Promise<{q?: string; page?: string}>}) {
    const user = await getCurrentUser();
    const userID = user.id;

    const params = await searchParams;
    const q = (params.q ?? "").trim();
    const pageSize = 10;
    
    const page = Math.max(1, Number(params.page ?? 1));
    const where = {userID, ...(q ? {OR: [{name: {contains: q, mode: "insensitive" as const}}, {sku: {contains: q, mode: "insensitive" as const}}]}: {})};

    const [totalCount, items] = await Promise.all([
        prisma.product.count({where: where}),
        prisma.product.findMany({ where: where, orderBy: {createdAt: 'desc'}, skip: (page - 1) * pageSize, take: pageSize})
    ]);
    const totalPages = Math.max(1, Math.ceil(totalCount/pageSize));

    return (
        <div className='w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 min-h-screen'>
            <div className='space-y-8'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>Inventory Management</h1>
                        <p className='text-gray-600 dark:text-gray-400 mt-2'>Manage your products and track inventory levels</p>
                    </div>
                    <Link 
                        href="/products" 
                        className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Add Product
                    </Link>
                </div>

                <div className='space-y-6'>
                    {/* Search Bar */}
                    <div className='bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm'>
                        <form className='flex gap-3' action="/inventory" method='GET'>
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                <input 
                                    name="q" 
                                    placeholder='Search by product name or SKU...' 
                                    defaultValue={q}
                                    className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                                />
                            </div>
                            <button className='px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'>Search</button>
                        </form>
                    </div>

                    {/* Products Table */}
                    <div className='bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600'>
                                    <tr>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Product Name</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>SKU</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Price</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Quantity</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Low Stock</th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200 dark:divide-slate-700'>
                                    {items.length > 0 ? (
                                        items.map((product, key) => (
                                            <tr key={key} className='hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors'>
                                                <td className='px-6 py-4 text-sm font-medium text-gray-900 dark:text-white'>{product.name}</td>
                                                <td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400'>{product.sku || "-"}</td>
                                                <td className='px-6 py-4 text-sm font-medium text-gray-900 dark:text-white'>${Number(product.price).toFixed(2)}</td>
                                                <td className='px-6 py-4 text-sm'>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                        product.quantity === 0 
                                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                                            : product.quantity <= (product.lowStockThreshold ?? 5)
                                                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                    }`}>
                                                        {product.quantity} units
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400'>{product.lowStockThreshold || "-"}</td>
                                                <td className='px-6 py-4 text-sm'>
                                                    <form action={async (formData: FormData) => {
                                                        "use server";
                                                        await deleteProduct(formData);
                                                    }} className='inline'>
                                                        <input type="hidden" name='id' value={product.id} />
                                                        <button 
                                                            className='inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors'
                                                            title="Delete product"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span className="text-xs font-medium">Delete</span>
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className='px-6 py-12 text-center text-gray-500 dark:text-gray-400'>
                                                <div className='text-base font-medium'>No products found</div>
                                                <p className='text-sm mt-1'>Try adjusting your search or add a new product</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className='bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm'>
                            <Pagination 
                                currentPage={page}
                                totalPages={totalPages}
                                baseUrl='/inventory'
                                searchParams={{q, pageSize: String(pageSize)}}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
