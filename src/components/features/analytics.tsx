'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ticketData = [
  { name: 'Hardware', value: 400, color: '#4F46E5' },
  { name: 'Software', value: 300, color: '#818CF8' },
  { name: 'Network', value: 300, color: '#A5B4FC' },
  { name: 'Security', value: 200, color: '#C7D2FE' },
];

const stockData = [
    { item: "HP Zbook 840", status: "Available", quantity: 12 },
    { item: "Dell Latitude 7420", status: "Available", quantity: 8 },
    { item: "Lenovo ThinkPad X1", status: "Low Stock", quantity: 3 },
    { item: "MacBook Pro 16", status: "Out of Stock", quantity: 0 },
];

export function Analytics() {
    return (
        <section className="w-full py-20 md:py-24 lg:py-32 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">Analytics & Reporting</h2>
                    <p className="mt-4 text-lg text-gray-600">Gain deep insights into your IT operations.</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <Card className="rounded-3xl shadow-lg border-white/20 bg-white/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>Open Tickets Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-80">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={ticketData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} label>
                                            {ticketData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl shadow-lg border-white/20 bg-white/50 backdrop-blur-lg">
                        <CardHeader>
                            <CardTitle>Available Stock Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {stockData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.item}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    item.status === 'Available' ? 'bg-green-100 text-green-800' : 
                                                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
