import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Dashboard() {
  const [formEntries, setFormEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'forms'));
        const entries = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFormEntries(entries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form entries:", error);
        setLoading(false);
      }
    };

    fetchFormEntries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 p-6 sm:p-8 md:p-12 ${geistSans.variable} font-sans`}>
      <header className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Turf Management Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of all registered turf facilities</p>
      </header>
      
      <div className="max-w-7xl mx-auto grid gap-6 sm:gap-8">
        {formEntries.map((entry) => (
          <div key={entry.id} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{entry.turfName}</h2>
                <div className="space-y-3 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Owner:</span> {entry.ownerName}</p>
                  <p><span className="font-semibold text-gray-900">Address:</span> {entry.address}</p>
                  <p><span className="font-semibold text-gray-900">Operating Hours:</span> {entry.operatingTime}</p>
                  <p><span className="font-semibold text-gray-900">Working Days:</span> {Array.isArray(entry.workingDays) ? entry.workingDays.join(', ') : entry.workingDays}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Arena Specifications</h3>
                <div className="space-y-3 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Dimensions:</span> {entry.arenaSize.length}m × {entry.arenaSize.breadth}m × {entry.arenaSize.height}m</p>
                  <p><span className="font-semibold text-gray-900">Sports:</span> {Array.isArray(entry.sportsAvailable) ? entry.sportsAvailable.join(', ') : entry.sportsAvailable}</p>
                  <p><span className="font-semibold text-gray-900">Equipment:</span> {Array.isArray(entry.equipment) ? entry.equipment.join(', ') : entry.equipment}</p>
                  <p><span className="font-semibold text-gray-900">Rate:</span> ₹{entry.charges}/hour</p>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Facilities & Amenities</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {entry.hasBackup && (
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Backup Power</span>
                )}
                {entry.hasFloodlights && (
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Floodlights</span>
                )}
                {entry.hasChangingRoom && (
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Changing Room</span>
                )}
                {entry.hasLavatory && (
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Lavatory</span>
                )}
                {entry.foodDeliveryAccess && (
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">Food Delivery</span>
                )}
              </div>
              <p className="text-gray-600"><span className="font-semibold text-gray-900">Additional Amenities:</span> {Array.isArray(entry.amenities) ? entry.amenities.join(', ') : entry.amenities}</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Operations</h3>
                <div className="space-y-3 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Staff Count:</span> {entry.employeeCount}</p>
                  <p><span className="font-semibold text-gray-900">Parking:</span> {entry.parkingCapacity} vehicles</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Metrics</h3>
                <div className="space-y-3 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Daily Usage:</span> {entry.avgOccupiedHours} hours</p>
                  <p><span className="font-semibold text-gray-900">Avg. Booking:</span> ₹{entry.avgOrderValue}</p>
                  <p><span className="font-semibold text-gray-900">Frequency:</span> {entry.bookingFrequency}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue</h3>
                <div className="space-y-3 text-gray-600">
                  <p><span className="font-semibold text-gray-900">Weekly:</span> ₹{entry.weeklyTurnover}</p>
                  <p><span className="font-semibold text-gray-900">Monthly:</span> ₹{entry.monthlyTurnover}</p>
                  <p><span className="font-semibold text-gray-900">Annual:</span> ₹{entry.yearlyTurnover}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
