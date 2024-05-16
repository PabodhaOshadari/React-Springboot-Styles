import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/userlist.css'; // Import your CSS file here
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import Chart from './Chart';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    color: 'blue', // Change heading color to blue
  },
  tableRow: {
    padding: 5,
  },
  tableCell: {
    padding: 5,
  },
  barContainer: {
    height: '20px',
    backgroundColor: '#ddd',
    borderRadius: '10px',
    margin: '10px 0',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: '10px',
    transition: 'width 0.5s ease',
  },
});

const UserList = () => {
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCountResponse = await axios.get('http://localhost:8081/api/users/user-count');
        setUserCount(userCountResponse.data);
        const userDetailsResponse = await axios.get('http://localhost:8081/api/users');
        setUserDetails(userDetailsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const progressBarWidth = {
    width: `${userCount}%`,
  };

  const handleViewDetails = async () => {
    try {
      // Fetch user details data
      const userDetailsResponse = await axios.get('http://localhost:8081/api/users');
      const userDetails = userDetailsResponse.data;

      // Open new window and render user details table
      const newWindow = window.open('', '_blank');
      newWindow.document.write('<html><head><title>User Details</title></head><body>');
      newWindow.document.write('<h2>User Details</h2>');
      newWindow.document.write('<table border="1" class="user-details-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead><tbody>');
      userDetails.forEach(user => {
        newWindow.document.write(`<tr><td>${user.name}</td><td>${user.email}</td><td>${user.role}</td></tr>`);
      });
      newWindow.document.write('</tbody></table>');
      newWindow.document.write('</body></html>');
      newWindow.document.close();
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleDownloadPDF = () => {
    setDownloadingPDF(true);
    console.log('Download button clicked');
  
    // Capture user details table and generate PDF
    const tableElement = document.querySelector('.user-details-table');
    console.log('Table Element:', tableElement); // Debugging statement
    if (!tableElement) {
      console.error('User details table not found');
      return;
    }
  
    html2canvas(tableElement)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
  
        // Calculate the center position of the page
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const watermarkWidth = pdf.getStringUnitWidth('Commercial Bank') * pdf.internal.getFontSize();
        const watermarkHeight = pdf.internal.getFontSize();
        const watermarkX = (pageWidth - watermarkWidth) / 2;
        const watermarkY = (pageHeight - watermarkHeight) / 2;
  
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.setTextColor(128, 128, 255); // Set text color to blue
        pdf.text('Commercial Bank', watermarkX, watermarkY); // Add watermark
        pdf.save('user_details.pdf');
        setDownloadingPDF(true);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        setDownloadingPDF(false);
      });
  };
  
  return (

    
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <Chart /> {/* Include the Chart component */}
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <div>
          <h3>User Count: {userCount}</h3>
          <div className={styles.barContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          {downloadingPDF ? (
            <p>Generating PDF...</p>
          ) : (
            <>
           <button className='view-button'> <PDFDownloadLink document={<MyDocument userDetails={userDetails} />} fileName="user_details.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
              </PDFDownloadLink> </button>
              
              <button className="view-button" onClick={handleViewDetails}>View</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const MyDocument = ({ userDetails }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
       <h1> <Text>User Details</Text></h1>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text>Name</Text>
            <Text>Email</Text>
          </View>
          {userDetails.map(user => (
            <View style={styles.tableRow} key={user.id}>
              <Text style={styles.tableCell}>{user.name}</Text>
              <Text style={styles.tableCell}>{user.email}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default UserList;
