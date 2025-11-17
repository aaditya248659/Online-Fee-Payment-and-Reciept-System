import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../useApi";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../PageCss/PaymentPage.css';

function PaymentPage() {
    const [user, setUser] = useState(null);
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        paymentMethod: 'card'
    });
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token in PaymentPage:', token); // Debug log
        
        if (!token) {
            console.log('No token found, redirecting to login'); // Debug log
            navigate('/login');
            return;
        }

        // Fetch user data
        api.get('/users/me')
        .then(res => {
            console.log('User data received:', res.data); // Debug log
            setUser(res.data);
            if (res.data.feeDue === 0 || res.data.feeDue === null) {
                alert('No pending fees to pay!');
                navigate('/home');
            }
        })
        .catch(err => {
            console.error('Error fetching user data:', err); // Debug log
            localStorage.removeItem('token');
            navigate('/login');
        });
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateTransactionId = () => {
        return 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
    };

    const generatePDFReceipt = async () => {
        const receiptElement = document.getElementById('receipt');
        
        try {
            const canvas = await html2canvas(receiptElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const imgWidth = 190;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            
            let position = 10;
            
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            pdf.save(`FeePay_Receipt_${transactionId}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating receipt. Please try again.');
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        setTimeout(async () => {
            try {
                const txnId = generateTransactionId();
                setTransactionId(txnId);

                // Update user's fee to 0 in backend
                const token = localStorage.getItem('token');
                api.put('/users/me', { feeDue: 0 });

                setPaymentSuccess(true);
                setLoading(false);
            } catch (error) {
                console.error('Payment error:', error);
                alert('Payment failed. Please try again.');
                setLoading(false);
            }
        }, 3000); // 3 second delay to simulate processing
    };

    const handleBackToHome = () => {
        navigate('/home');
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="payment-bg">
            <div className="payment-container">
                {!paymentSuccess ? (
                    <div className="payment-card">
                        <div className="payment-header">
                            <h2>💳 Fee Payment</h2>
                            <button className="back-btn" onClick={() => navigate('/home')}>
                                ← Back to Home
                            </button>
                        </div>

                        <div className="fee-summary">
                            <h3>Payment Summary</h3>
                            <div className="summary-row">
                                <span>Student Name:</span>
                                <span>{user.name}</span>
                            </div>
                            <div className="summary-row">
                                <span>Roll Number:</span>
                                <span>{user.roll_no || 'N/A'}</span>
                            </div>
                            <div className="summary-row">
                                <span>Course:</span>
                                <span>{user.course || 'N/A'}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Amount to Pay:</span>
                                <span>₹{user.feeDue}</span>
                            </div>
                        </div>

                        <form onSubmit={handlePayment} className="payment-form">
                            <div className="payment-method">
                                <h4>Payment Method</h4>
                                <div className="method-options">
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentData.paymentMethod === 'card'}
                                            onChange={handleInputChange}
                                        />
                                        Credit/Debit Card
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={paymentData.paymentMethod === 'upi'}
                                            onChange={handleInputChange}
                                        />
                                        UPI Payment
                                    </label>
                                </div>
                            </div>

                            {paymentData.paymentMethod === 'card' && (
                                <div className="card-details">
                                    <div className="form-group">
                                        <label>Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="cardholderName"
                                            value={paymentData.cardholderName}
                                            onChange={handleInputChange}
                                            placeholder="Enter cardholder name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={paymentData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            required
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={paymentData.expiryDate}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={paymentData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                maxLength="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentData.paymentMethod === 'upi' && (
                                <div className="upi-details">
                                    <div className="upi-info">
                                        <p>🔒 Secure UPI Payment</p>
                                        <p>You will be redirected to your UPI app to complete the payment</p>
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="pay-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Processing Payment...
                                    </>
                                ) : (
                                    `Pay ₹${user.feeDue}`
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="success-container">
                        <div className="success-card">
                            <div className="success-icon">✅</div>
                            <h2>Payment Successful!</h2>
                            <p>Transaction ID: {transactionId}</p>
                            <p>Amount Paid: ₹{user.feeDue}</p>
                            
                            <div className="action-buttons">
                                <button className="download-btn" onClick={generatePDFReceipt}>
                                    📄 Download Receipt
                                </button>
                                <button className="home-btn" onClick={handleBackToHome}>
                                    🏠 Back to Home
                                </button>
                            </div>
                        </div>

                        {/* Hidden Receipt for PDF Generation */}
                        <div id="receipt" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                            <div style={{ 
                                padding: '40px', 
                                fontFamily: 'Arial, sans-serif', 
                                backgroundColor: '#fff',
                                width: '600px',
                                border: '2px solid #007cf0'
                            }}>
                                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                    <h1 style={{ color: '#007cf0', marginBottom: '10px' }}>FeePay</h1>
                                    <h2 style={{ color: '#333', marginBottom: '5px' }}>Payment Receipt</h2>
                                    <p style={{ color: '#666', margin: '0' }}>Official Fee Payment Confirmation</p>
                                </div>
                                
                                <div style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <strong>Transaction ID:</strong>
                                        <span>{transactionId}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <strong>Date & Time:</strong>
                                        <span>{new Date().toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <strong>Student Name:</strong>
                                        <span>{user.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <strong>Roll Number:</strong>
                                        <span>{user.roll_no || 'N/A'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <strong>Course:</strong>
                                        <span>{user.course || 'N/A'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <strong>Email:</strong>
                                        <span>{user.email}</span>
                                    </div>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        padding: '15px 0',
                                        borderTop: '2px solid #007cf0',
                                        marginTop: '15px',
                                        fontSize: '18px',
                                        fontWeight: 'bold'
                                    }}>
                                        <span>Amount Paid:</span>
                                        <span style={{ color: '#27ae60' }}>₹{user.feeDue}</span>
                                    </div>
                                </div>
                                
                                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    <p style={{ color: '#27ae60', fontSize: '16px', fontWeight: 'bold' }}>
                                        ✅ Payment Status: SUCCESSFUL
                                    </p>
                                    <p style={{ color: '#666', fontSize: '14px', marginTop: '20px' }}>
                                        This is a computer-generated receipt. No signature required.
                                    </p>
                                    <p style={{ color: '#666', fontSize: '12px', marginTop: '10px' }}>
                                        For queries, contact: support@feepay.com | +91-1234567890
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentPage;