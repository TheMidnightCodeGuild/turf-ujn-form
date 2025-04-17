import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [formData, setFormData] = useState({
    ownerName: "",
    turfName: "",
    address: "",
    operatingTime: "",
    workingDays: [],
    arenaSize: {
      length: "",
      breadth: "",
      height: ""
    },
    sportsAvailable: [],
    employeeCount: "",
    equipment: [],
    charges: "",
    hasBackup: false,
    hasFloodlights: false,
    hasChangingRoom: false,
    hasLavatory: false,
    foodDeliveryAccess: false,
    amenities: [],
    parkingCapacity: "",
    avgOccupiedHours: "",
    avgOrderValue: "",
    bookingFrequency: "",
    weeklyTurnover: "",
    monthlyTurnover: "",
    yearlyTurnover: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, "forms"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert("Form submitted successfully!");
      // Reset form
      setFormData({
        ownerName: "",
        turfName: "",
        address: "",
        operatingTime: "",
        workingDays: [],
        arenaSize: {
          length: "",
          breadth: "",
          height: ""
        },
        sportsAvailable: [],
        employeeCount: "",
        equipment: [],
        charges: "",
        hasBackup: false,
        hasFloodlights: false,
        hasChangingRoom: false,
        hasLavatory: false,
        foodDeliveryAccess: false,
        amenities: [],
        parkingCapacity: "",
        avgOccupiedHours: "",
        avgOrderValue: "",
        bookingFrequency: "",
        weeklyTurnover: "",
        monthlyTurnover: "",
        yearlyTurnover: ""
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen p-4 sm:p-6 md:p-8`}>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">Turf/Arena Registration Form</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Owner&apos;s Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              value={formData.ownerName}
              onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Turf/Firm Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              value={formData.turfName}
              onChange={(e) => setFormData({...formData, turfName: e.target.value})}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Address</label>
            <textarea
              className="w-full p-2 border rounded text-sm sm:text-base"
              rows="3"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Operating Time</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="e.g. 9:00 AM - 10:00 PM"
              value={formData.operatingTime}
              onChange={(e) => setFormData({...formData, operatingTime: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Working Days</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="e.g. Monday-Sunday"
              value={formData.workingDays}
              onChange={(e) => setFormData({...formData, workingDays: e.target.value.split(',')})}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Arena Size (in meters)</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <input
                type="number"
                placeholder="Length"
                className="p-2 border rounded text-sm sm:text-base"
                value={formData.arenaSize.length}
                onChange={(e) => setFormData({
                  ...formData,
                  arenaSize: {...formData.arenaSize, length: e.target.value}
                })}
              />
              <input
                type="number"
                placeholder="Breadth"
                className="p-2 border rounded text-sm sm:text-base"
                value={formData.arenaSize.breadth}
                onChange={(e) => setFormData({
                  ...formData,
                  arenaSize: {...formData.arenaSize, breadth: e.target.value}
                })}
              />
              <input
                type="number"
                placeholder="Height"
                className="p-2 border rounded text-sm sm:text-base"
                value={formData.arenaSize.height}
                onChange={(e) => setFormData({
                  ...formData,
                  arenaSize: {...formData.arenaSize, height: e.target.value}
                })}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Sports Available</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="Comma separated list"
              value={formData.sportsAvailable}
              onChange={(e) => setFormData({...formData, sportsAvailable: e.target.value.split(',')})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Number of Employees</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm sm:text-base"
              value={formData.employeeCount}
              onChange={(e) => setFormData({...formData, employeeCount: e.target.value})}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Sports Equipment Available</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="Comma separated list"
              value={formData.equipment}
              onChange={(e) => setFormData({...formData, equipment: e.target.value.split(',')})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Charges/Tariff</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="₹ per hour"
              value={formData.charges}
              onChange={(e) => setFormData({...formData, charges: e.target.value})}
            />
          </div>

          <div className="space-y-2 sm:space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.hasBackup}
                onChange={(e) => setFormData({...formData, hasBackup: e.target.checked})}
              />
              <label className="text-sm sm:text-base">Electricity Backup Available</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.hasFloodlights}
                onChange={(e) => setFormData({...formData, hasFloodlights: e.target.checked})}
              />
              <label className="text-sm sm:text-base">Flood Lights Available</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.hasChangingRoom}
                onChange={(e) => setFormData({...formData, hasChangingRoom: e.target.checked})}
              />
              <label className="text-sm sm:text-base">Changing Room Available</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.hasLavatory}
                onChange={(e) => setFormData({...formData, hasLavatory: e.target.checked})}
              />
              <label className="text-sm sm:text-base">Lavatory Available</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.foodDeliveryAccess}
                onChange={(e) => setFormData({...formData, foodDeliveryAccess: e.target.checked})}
              />
              <label className="text-sm sm:text-base">Accessible to Zomato/BlinkIt</label>
            </div>
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Amenities</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="Comma separated list"
              value={formData.amenities}
              onChange={(e) => setFormData({...formData, amenities: e.target.value.split(',')})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Parking Capacity</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="Number of vehicles"
              value={formData.parkingCapacity}
              onChange={(e) => setFormData({...formData, parkingCapacity: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Average Occupied Hours</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="Hours per day"
              value={formData.avgOccupiedHours}
              onChange={(e) => setFormData({...formData, avgOccupiedHours: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Average Order Value</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="₹"
              value={formData.avgOrderValue}
              onChange={(e) => setFormData({...formData, avgOrderValue: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Family/Corporate Booking Frequency</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="e.g. 5 times per week"
              value={formData.bookingFrequency}
              onChange={(e) => setFormData({...formData, bookingFrequency: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Weekly Turnover</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="₹"
              value={formData.weeklyTurnover}
              onChange={(e) => setFormData({...formData, weeklyTurnover: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Monthly Turnover</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="₹"
              value={formData.monthlyTurnover}
              onChange={(e) => setFormData({...formData, monthlyTurnover: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">Yearly Turnover</label>
            <input
              type="number"
              className="w-full p-2 border rounded text-sm sm:text-base"
              placeholder="₹"
              value={formData.yearlyTurnover}
              onChange={(e) => setFormData({...formData, yearlyTurnover: e.target.value})}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm sm:text-base hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Submitting...
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
}
