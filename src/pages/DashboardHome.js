import React from 'react';
import '../styles/DashboardHome.css'; // Create a separate CSS file for the home content styles

const DashboardHome = () => {
    return (
        <div>
            <section className="welcome-section">
                <h2>Welcome back, Ayodele Irepodun</h2>
                <p>You have 27 new students added to your domain. Please reach out to the Head Teacher if you want them excluded from your domain.</p>
            </section>
            <section className="statistics">
                <div className="stat-card">
                    <h3>Student Statistic</h3>
                    <div className="chart">[Chart Placeholder]</div>
                </div>
                <div className="stat-card">
                    <h3>Class Progress</h3>
                    <div className="progress-list">
                        <div className="progress-item">Class A - 32%</div>
                        <div className="progress-item">Class B - 43%</div>
                        <div className="progress-item">Class C - 67%</div>
                        <div className="progress-item">Class D - 56%</div>
                    </div>
                </div>
                <div className="stat-card">
                    <h3>Upcoming Activities</h3>
                    <ul className="activities-list">
                        <li className="activity-item">Meeting with the VC</li>
                        <li className="activity-item">Meeting with the J...</li>
                        <li className="activity-item">Class B middle session</li>
                        <li className="activity-item">Send Mr. Ayo class...</li>
                    </ul>
                </div>
                <div className="stat-card">
                    <h3>Documents</h3>
                    <ul className="documents-list">
                        <li className="document-item">Class A 1st semester result</li>
                        <li className="document-item">Kelvin college application</li>
                        <li className="document-item">Class E attendance sheet</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default DashboardHome;
