import ProductCharts from "@/components/productcharts";
import { getCurrentUser } from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import { DollarSign, Package, TrendingUp } from "lucide-react";

export default async function DashboardPage() {

    const user = await getCurrentUser();
    const userID = user.id;

    const [totalProducts, lowStockProducts, allProducts, recent] = await Promise.all([
        prisma.product.count({where : {userID}}),
        prisma.product.count({
        where: {
            userID,
            lowStockThreshold: {
                not: null,
            },
            quantity: {lte: 5}
        },
        }),
        prisma.product.findMany({ where: { userID}, select: {price: true, quantity: true, createdAt: true} }),

        prisma.product.findMany({
        where: { userID },
        orderBy: { createdAt: "desc" },
        take: 5,
        }),

    ]);
    const totalValue = allProducts.reduce((sum: number, product) => sum + Number(product.price) * Number(product.quantity), 0);

    const inStockCount = allProducts.filter((product) => Number(product.quantity) > 5).length;
    const lowStockCount = allProducts.filter((product) => Number(product.quantity) <= 5 && Number(product.quantity) >=1).length;
    const outOfStockCount = allProducts.filter((product) => Number(product.quantity) === 0).length;
    
    const inStockPercentage = totalProducts > 0 ? Math.round((inStockCount / allProducts.length) * 100) : 0;
    const lowStockPercentage = totalProducts > 0 ? Math.round((lowStockCount / allProducts.length) * 100) : 0;
    const outOfStockPercentage = totalProducts > 0 ? Math.round((outOfStockCount / allProducts.length) * 100) : 0;

    
    
    const now = new Date();
    const weeklyProductData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7 );
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, '0')}/${String(weekStart.getDate()).padStart(2, '0')}`;
        const weekProducts = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        })

        weeklyProductData.push({
            week: weekLabel,
            products: weekProducts.length,
        });
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900">
            <div className="space-y-8">
                {/*Header*/}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here is the overview of your inventory</p>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Total Products Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</h3>
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{totalProducts}</div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600">+{totalProducts} items</span>
                        </div>
                    </div>

                    {/* Total Value Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</h3>
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">${Number(totalValue).toFixed(0)}</div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600">Inventory value</span>
                        </div>
                    </div>

                    {/* Low Stock Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Alert</h3>
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{lowStockProducts}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-orange-600">Items need attention</span>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Weekly Products Chart */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Products Per Week</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">12-week trend</p>
                        </div>
                        <div className="h-64">
                           <ProductCharts data={weeklyProductData}/>
                        </div>
                    </div>

                    {/* Stock Distribution */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stock Distribution</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">By status</p>
                        </div>
                        <div className="flex items-center justify-center h-64">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-slate-700"></div>
                                <div
                                    className={`absolute inset-0 rounded-full`}
                                    style={{
                                        background: `conic-gradient(#10B981 ${Math.max(
                                            0,
                                            Math.min(100, inStockPercentage)
                                        )}%, #F59E0B ${Math.max(0, Math.min(100, inStockPercentage))}% ${Math.max(0, Math.min(100, inStockPercentage + lowStockPercentage))}%, #EF4444 ${Math.max(0, Math.min(100, inStockPercentage + lowStockPercentage))}% 100%)`,
                                    }}
                                />
                                <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-800" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{inStockPercentage}%</div> 
                                        <div className="text-xs text-gray-600 dark:text-gray-400">In Stock</div>   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-gray-700 dark:text-gray-300">In Stock</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{inStockPercentage}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span className="text-gray-700 dark:text-gray-300">Low Stock</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{lowStockPercentage}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="text-gray-700 dark:text-gray-300">Out of Stock</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{outOfStockPercentage}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Stock Levels */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Products</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest items added to inventory</p>
                    </div>
                    <div className="space-y-3">
                        {recent.map((product, key) => {
                            const stockLevel = product.quantity === 0 ? "Out of Stock" : product.quantity <= (product.lowStockThreshold ?? 5) ? "Low Stock" : "In Stock";
                            const bgColor = stockLevel === "Out of Stock" ? "bg-red-100 dark:bg-red-900/30" : stockLevel === "Low Stock" ? "bg-amber-100 dark:bg-amber-900/30" : "bg-green-100 dark:bg-green-900/30";
                            const textColor = stockLevel === "Out of Stock" ? "text-red-700 dark:text-red-400" : stockLevel === "Low Stock" ? "text-amber-700 dark:text-amber-400" : "text-green-700 dark:text-green-400";
                            const dotColor = stockLevel === "Out of Stock" ? "bg-red-500" : stockLevel === "Low Stock" ? "bg-amber-500" : "bg-green-500";
                            
                            return (
                                <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
                                        <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
                                        {product.quantity} units - {stockLevel}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}