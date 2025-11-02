import Pagination from '@/components/pagination';
import { deleteProduct} from '@/lib/actions/products';
import { getCurrentUser } from '@/lib/auth';
import {prisma} from '@/lib/prisma';
import React from 'react'

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
        <div className='min-h-screen max-w-full'>
            <main className='p-8'>
                <div className='mb-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-2xl font-semibold text-foreground'>Inventory</h1>
                            <p className='text-sm text-secodary-foreground'>Manage your products and track inventory levels</p>
                        </div>
                    </div>
                </div>

                <div className='space-y-6'>

                    {/* Search */}
                    <div className='bg-card rounded-lg border border-gray-200 p-6'>
                        <form className='flex gap-2' action="/inventory" method='GET'>
                            <input name="q" placeholder='Search products...' className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent '/>
                            <button className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'>Search</button>
                        </form>
                    </div>

                    {/* Products table */}
                    <div>
                        <div className='bg-card shadow-sm rounded-lg border border-gray-200'>
                            <table className='w-full'>
                                <thead className='bg-secondary'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase'>Name</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase'>SKU</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase'>Price</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase'>Quantity</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase'>Low Stock</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody className='bg-secondary divide-y divide-secondary-foreground'>
                                    {
                                        items.map((product, key) => (
                                            <tr key={key} className='hover:bg-gray-300'>
                                                <td className='px-6 py-4 text-sm text-foreground'>{product.name}</td>
                                                <td className='px-6 py-4 text-sm text-foreground'>{product.sku || "-"}</td>
                                                <td className='px-6 py-4 text-sm text-foreground'>${Number(product.price)}</td>
                                                <td className='px-6 py-4 text-sm text-foreground'>{product.quantity}</td>
                                                <td className='px-6 py-4 text-sm text-foreground'>{product.lowStockThreshold || "-"}</td>
                                                <td className='px-6 py-4 text-sm text-foreground'>
                                                    <form action={async (formData: FormData) => {
                                                        "use server";
                                                        await deleteProduct(formData);
                                                    }}>
                                                        <input type="hidden" name='id' value={product.id} className=''/>
                                                        <button className='text-red-500 hover:text-red-900 border border-red-500 rounded-lg p-2'>Delete</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        { totalPages > 1 && (
                                <div className='bg-white rounded-lg border border-gray-200 p-6'>
                                    <Pagination 
                                        currentPage={page}
                                        totalPages={totalPages}
                                        baseUrl='/inventory'
                                        searchParams={{q, pageSize: String(pageSize)}}
                                    />
                                </div>)
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}
