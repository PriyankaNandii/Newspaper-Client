import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../hook/useAxiosSecure';
import { Chart } from "react-google-charts";

const pieOptions = {
    title: "Article Publisher Statistics",
    is3D: true,
};

const lineOptions = {
    title: "Publisher Count Over Time",
    curveType: "function",
    legend: { position: 'bottom' },
};

const Statistics = () => {
    const { data: chartData = [], isLoading, error } = useQuery({
        queryKey: ['articles-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stat');
            return [['Publisher', 'Count'], ...res.data];
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    // Preparing line chart data
    const publishers = chartData.slice(1).map(item => item[0]);
    const counts = chartData.slice(1).map(item => item[1]);
    const lineData = [
        ['Publisher', ...publishers],
        ['Count', ...counts]
    ];

    return (
        <div>
            <Chart
                chartType="PieChart"
                data={chartData}
                options={pieOptions}
                width={"100%"}
                height={"400px"}
            />
            <Chart
                chartType="LineChart"
                data={lineData}
                options={lineOptions}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default Statistics;
