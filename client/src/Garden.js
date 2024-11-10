// import { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import axios from 'axios';  // You can use axios to send data to your backend

// const DigitalGarden = () => {
//   // Initial tree with one segment
//   const [userActivity, setUserActivity] = useState([true]);
//   const [selectedDate, setSelectedDate] = useState(''); // State to hold the selected date
//   const svgRef = useRef();

//   // Function to mark day complete and add new segment
//   const markDayComplete = async () => {
//     if (!selectedDate) {
//       alert('Please select a date!');
//       return;
//     }

//     // Send the selected date to the backend
//     try {
//       const response = await axios.post('http://your-backend-endpoint', {
//         date: selectedDate,
//         userActivity: true, // Send additional data if necessary
//       });

//       if (response.status !== 200) {
//         // If backend response is success, update the tree with new segment
//         setUserActivity((prev) => [...prev, true]);
//       }
//     } catch (error) {
//       console.error('Error sending data to backend:', error);
//     }
//   };

//   // Effect to redraw the tree when userActivity changes
//   useEffect(() => {
//     const colors = ['green', 'yellow', 'orange', 'red', 'blue'];
//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove(); // Clear previous renders

//     const width = svg.node().getBoundingClientRect().width;
//     const height = svg.node().getBoundingClientRect().height;

//     const gardenGroup = svg.append('g').attr('transform', `translate(${width / 2}, ${height - 50})`);

//     let y = 0; // Start at the bottom

//     // Draw tree structure based on userActivity
//     userActivity.forEach((isActive, index) => {
//       const length = 50; // Length of each segment
//       const color = colors[index % colors.length]; // Cycle through colors

//       // Draw the vertical line (tree trunk)
//       gardenGroup.append('line')
//         .attr('x1', 0)
//         .attr('y1', y)
//         .attr('x2', 0)
//         .attr('y2', y - length)
//         .attr('stroke', color)
//         .attr('stroke-width', 3)
//         .style('opacity', 0)
//         .transition()
//         .duration(800)
//         .style('opacity', 1); // Fade in the trunk

//       // Add a circle at the base of each segment
//       gardenGroup.append('circle')
//         .attr('cx', 0)
//         .attr('cy', y - length)
//         .attr('r', 4)
//         .attr('fill', color)
//         .style('opacity', 0)
//         .transition()
//         .duration(800)
//         .style('opacity', 1); // Fade in the circle

//       // Move the start point for the next line
//       y -= length;

//       // Draw left and right branches if active
//       if (isActive) {
//         // Left curved branch
//         gardenGroup.append('path')
//           .attr('d', `M0,${y} C-20,${y - 10} -40,${y - 20} -20,${y - 40}`)
//           .attr('stroke', color)
//           .attr('stroke-width', 2)
//           .attr('fill', 'none')
//           .style('opacity', 0)
//           .transition()
//           .duration(800)
//           .style('opacity', 1); // Fade in the left branch

//         // Right curved branch
//         gardenGroup.append('path')
//           .attr('d', `M0,${y} C20,${y - 10} 40,${y - 20} 20,${y - 40}`)
//           .attr('stroke', color)
//           .attr('stroke-width', 2)
//           .attr('fill', 'none')
//           .style('opacity', 0)
//           .transition()
//           .duration(800)
//           .style('opacity', 1); // Fade in the right branch
//       }
//     });
//   }, [userActivity]); // Redraw the tree when userActivity changes
//   setUserActivity((prev) => [...prev, true]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-r">
//       <div className="flex flex-col items-center space-y-8">
//         <h1 className="text-4xl font-bold text-white drop-shadow-md">Simple Tree Visualization</h1>

//         {/* Move the Date Picker above the tree */}
//         <div className="flex flex-col items-center">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="p-2 rounded-lg border-2 border-white bg-white text-black"
//             min={new Date().toISOString().split('T')[0]} // Prevent past dates
//           />
//         </div>

//         <svg
//           ref={svgRef}
//           className="w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-3/4 h-96 shadow-sm rounded-xl"
//         />

//         <button
//           onClick={markDayComplete}
//           className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-md transform transition-all duration-300 hover:bg-green-700 hover:scale-105"
//         >
//           Mark Habit as Completed
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DigitalGarden;
