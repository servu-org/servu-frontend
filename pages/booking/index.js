// pages/booking/index.js
import Head from 'next/head';
import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ServiceSelector from '../../components/booking/ServiceSelector';
import LocationPicker from '../../components/booking/LocationPicker';
import DateTimePicker from '../../components/booking/DateTimePicker';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
// import { useAuth } from '../../contexts/AuthContext';
// import useAuthRedirect from '../../hooks/useAuthRedirect';

export default function BookingPage() {
  // const { currentUser } = useAuth();
  // useAuthRedirect(); // Redirect if not logged in

  const [step, setStep] = useState(1); // 1: Service, 2: Location, 3: Time, 4: Confirm
  const [bookingDetails, setBookingDetails] = useState({
    service: null,
    location: null,
    dateTime: null,
  });

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => prev - 1);

  const handleSubmitBooking = () => {
    // Placeholder for booking submission logic
    console.log("Booking Submitted:", bookingDetails);
    // Call bookingService.createBooking(bookingDetails)
    alert("Booking request sent! (Placeholder)");
    // Redirect to dashboard or booking confirmation page
  };

  // if (!currentUser) return <MainLayout><p>Loading or redirecting...</p></MainLayout>;

  return (
    <MainLayout>
      <Head>
        <title>Book a Service - ServU</title>
      </Head>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Book a Service</h1>

        <Card className="p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Select Service</h2>
              <ServiceSelector
                onSelect={(service) => setBookingDetails(prev => ({ ...prev, service }))}
              />
              <Button onClick={handleNextStep} className="mt-4 w-full">Next</Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 2: Set Your Location</h2>
              <LocationPicker
                onLocationSet={(location) => setBookingDetails(prev => ({ ...prev, location }))}
              />
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePrevStep} variant="secondary">Back</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Choose Date & Time</h2>
              <DateTimePicker
                onDateTimeSet={(dateTime) => setBookingDetails(prev => ({ ...prev, dateTime }))}
              />
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePrevStep} variant="secondary">Back</Button>
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 4: Confirm Booking</h2>
              <p><strong>Service:</strong> {bookingDetails.service || 'Not selected'}</p>
              <p><strong>Location:</strong> {bookingDetails.location || 'Not set'}</p>
              <p><strong>Date & Time:</strong> {bookingDetails.dateTime || 'Not set'}</p>
              {/* Display price estimate if available */}
              <div className="mt-6 flex justify-between">
                <Button onClick={handlePrevStep} variant="secondary">Back</Button>
                <Button onClick={handleSubmitBooking} className="bg-green-500 hover:bg-green-700">Confirm & Book</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}
