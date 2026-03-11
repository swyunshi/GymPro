import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { FaDumbbell, FaCheckCircle } from 'react-icons/fa';

const WorkoutPlan = () => {
    const { profile } = useAuth();
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        if (!profile?.id) return;
        supabase.from('workout_plans').select('*, trainers(name)').eq('member_id', profile.id).single().then(({ data }) => setPlan(data));
    }, [profile]);

    // Demo data when no plan assigned
    const demoExercises = [
        { day: 'Monday', exercises: [{ name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' }, { name: 'Incline DB Press', sets: 3, reps: '10-12', rest: '60s' }, { name: 'Cable Flies', sets: 3, reps: '12-15', rest: '60s' }] },
        { day: 'Wednesday', exercises: [{ name: 'Squat', sets: 5, reps: '5-6', rest: '2min' }, { name: 'Leg Press', sets: 4, reps: '10-12', rest: '90s' }, { name: 'Romanian Deadlift', sets: 3, reps: '10', rest: '90s' }] },
        { day: 'Friday', exercises: [{ name: 'Deadlift', sets: 4, reps: '5', rest: '3min' }, { name: 'Pull-ups', sets: 4, reps: 'to failure', rest: '90s' }, { name: 'Barbell Rows', sets: 3, reps: '8-10', rest: '90s' }] },
    ];

    const exercises = plan?.exercises || demoExercises;

    return (
        <div>
            <div className="page-header">
                <h1>Workout Plan</h1>
                <p>Your trainer-assigned workout schedule</p>
            </div>

            {plan?.trainers && (
                <div className="card" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FaDumbbell style={{ color: 'var(--primary)', fontSize: '1.2rem' }} />
                    <span>Assigned by <strong style={{ color: 'var(--primary)' }}>{plan.trainers.name}</strong></span>
                </div>
            )}
            {!plan && (
                <div className="card" style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(255,215,0,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    📋 No workout plan assigned yet. Showing <strong>sample plan</strong>. Contact your trainer to get a personalized plan.
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {exercises.map((dayPlan, i) => (
                    <div key={i} className="card">
                        <h3 style={{ color: 'var(--primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FaDumbbell /> {dayPlan.day}
                        </h3>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr><th>Exercise</th><th>Sets</th><th>Reps</th><th>Rest</th><th>Done</th></tr>
                                </thead>
                                <tbody>
                                    {dayPlan.exercises.map((ex, ei) => (
                                        <tr key={ei}>
                                            <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ex.name}</td>
                                            <td>{ex.sets}</td>
                                            <td>{ex.reps}</td>
                                            <td>{ex.rest}</td>
                                            <td><FaCheckCircle style={{ color: 'var(--text-muted)' }} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkoutPlan;
