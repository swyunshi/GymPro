import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import { FaAppleAlt, FaFire } from 'react-icons/fa';

const DietPlan = () => {
    const { profile } = useAuth();
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        if (!profile?.id) return;
        supabase.from('diet_plans').select('*').eq('member_id', profile.id).single().then(({ data }) => setPlan(data));
    }, [profile]);

    const demoMeals = [
        { time: '7:00 AM', name: 'Breakfast', foods: 'Oatmeal, 4 Egg Whites, Banana', calories: 450, protein: '30g', carbs: '60g', fats: '8g' },
        { time: '10:30 AM', name: 'Mid-Morning Snack', foods: 'Greek Yogurt, Almonds', calories: 220, protein: '15g', carbs: '20g', fats: '10g' },
        { time: '1:00 PM', name: 'Lunch', foods: 'Grilled Chicken, Brown Rice, Salad', calories: 550, protein: '45g', carbs: '55g', fats: '12g' },
        { time: '4:00 PM', name: 'Pre-Workout', foods: 'Banana, Protein Shake', calories: 280, protein: '25g', carbs: '35g', fats: '4g' },
        { time: '8:00 PM', name: 'Dinner', foods: 'Salmon, Sweet Potato, Vegetables', calories: 500, protein: '40g', carbs: '45g', fats: '15g' },
    ];

    const meals = plan?.meals || demoMeals;
    const totalCalories = plan?.daily_calories || 2000;
    const consumed = meals.reduce((sum, m) => sum + (m.calories || 0), 0);
    const remaining = totalCalories - consumed;

    const chartData = [
        { name: 'Remaining', value: remaining, fill: 'rgba(255,255,255,0.08)' },
        { name: 'Consumed', value: consumed, fill: 'var(--primary)' },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Diet Plan</h1>
                <p>Your personalized nutrition and meal plan</p>
            </div>

            {!plan && (
                <div className="card" style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(255,215,0,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    📋 No diet plan assigned yet. Showing a <strong>sample plan</strong>. Contact your nutritionist for a custom plan.
                </div>
            )}

            {/* Calorie Tracker */}
            <div className="grid-2" style={{ marginBottom: 24 }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <h3 style={{ display: 'flex', gap: 8, alignItems: 'center' }}><FaFire style={{ color: 'var(--primary)' }} /> Calorie Tracker</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <RadialBarChart cx="50%" cy="50%" innerRadius="50%" outerRadius="100%" data={chartData} startAngle={90} endAngle={-270}>
                            <RadialBar dataKey="value" />
                            <Tooltip formatter={(v) => `${v} kcal`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8 }} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{consumed}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>of {totalCalories} kcal goal</div>
                        <div style={{ color: remaining >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600, marginTop: 4 }}>
                            {remaining >= 0 ? `${remaining} kcal remaining` : `${Math.abs(remaining)} kcal over`}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 16 }}>Macro Summary</h3>
                    {[
                        { label: 'Protein', colour: '#3498db', pct: 40 },
                        { label: 'Carbohydrates', colour: '#FFD700', pct: 45 },
                        { label: 'Fats', colour: '#e74c3c', pct: 25 },
                    ].map(m => (
                        <div key={m.label} style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{m.label}</span>
                                <span style={{ color: m.colour, fontWeight: 700 }}>{m.pct}%</span>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                                <div style={{ width: `${m.pct}%`, height: '100%', background: m.colour, borderRadius: 8 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Meal Plan */}
            <div className="card">
                <h3 style={{ marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center' }}><FaAppleAlt style={{ color: 'var(--primary)' }} /> Meal Schedule</h3>
                <div className="table-wrapper">
                    <table>
                        <thead><tr><th>Time</th><th>Meal</th><th>Foods</th><th>Calories</th><th>Protein</th><th>Carbs</th><th>Fats</th></tr></thead>
                        <tbody>
                            {meals.map((m, i) => (
                                <tr key={i}>
                                    <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{m.time}</td>
                                    <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{m.name}</td>
                                    <td>{m.foods}</td>
                                    <td>{m.calories} kcal</td>
                                    <td>{m.protein}</td>
                                    <td>{m.carbs}</td>
                                    <td>{m.fats}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DietPlan;
