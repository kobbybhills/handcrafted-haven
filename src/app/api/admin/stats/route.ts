import { connectDB } from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // 1. Calculate Overall Total Sales (for the dashboard card)
    const overallStats = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } }
    ]);

    const totalSales = overallStats.length > 0 ? overallStats[0].totalSales : 0;

    // 2. Get Daily Sales for the Graph (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const chartData = await Order.aggregate([
      { 
        $match: { 
          status: "completed", 
          createdAt: { $gte: sevenDaysAgo } 
        } 
      },
      {
        $group: {
          // Groups by date string (e.g., "2026-04-05")
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }, // Sort by date ascending
      { 
        $project: { 
          date: "$_id", 
          amount: 1, 
          _id: 0 
        } 
      }
    ]);

    // Return both pieces of data
    return NextResponse.json({ 
      totalSales, 
      chartData 
    }, { status: 200 });

  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}