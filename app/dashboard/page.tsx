import ProductCharts from "@/components/productcharts";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DollarSign, TrendingUp } from "lucide-react";

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
    const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0);
    
    const weeklyProductData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date();
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
        <div className="min-h-screen bg-gra-50">
            <Sidebar currentPath={"/dashboard"}/>
            <main className="ml-64 p-8">
                {/*Header*/}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-500">Welcome back! Here is the overview of your inventory</p>
                        </div>
                    </div>
                </div>
                {/* Key Metric */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg text-gray-900 mb-6 font-bold">Key Metrics</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
                                <div className="text-sm text-gray-600">Total Products</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+{totalProducts}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{Number(totalValue).toFixed(0)}</div>
                                <div className="text-sm text-gray-600">Total Value</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+{Number(totalValue).toFixed(0)}</span>
                                    <DollarSign className="w-3 h-3 text-green-600 ml-1"/>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{lowStockProducts}</div>
                                <div className="text-sm text-gray-600">Low Stock</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-red-600">+{lowStockProducts}</span>
                                    <TrendingUp className="w-3 h-3 text-red-600 ml-1"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg text-gray-900 font-bold">Products Per Week</h2>
                        </div>
                        <div className="h-48">
                           <ProductCharts data={weeklyProductData}/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Stock */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg text-gray-900 font-bold">Stock Levels</h2>
                        </div>
                        <div className="space-y-3">
                            {recent.map((product, key) => {
                                const stockLevel = product.quantity === 0 ? "Out of Stock" : product.quantity <= (product.lowStockThreshold ?? 5) ? "Low Stock" : "In Stock";
                                const bgColors = ["bg-red-600","bg-yellow-600","bg-green-600"];
                                const textColors = ["text-red-600","text-yellow-600","text-green-600"];
                                const stockIndex = stockLevel === "Out of Stock" ? 0 : stockLevel === "Low Stock" ? 1 : 2;
                                return (
                                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-3 h-3 rounded-full ${bgColors[stockIndex]}`}></div>
                                            <span className=" text-sm text-gray-800 font-medium">{product.name}</span>
                                        </div>
                                        <div className={`text-sm ${textColors[stockIndex]}`}>{product.quantity} units</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}