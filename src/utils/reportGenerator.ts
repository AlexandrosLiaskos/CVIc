// src/utils/reportGenerator.ts
import { ShorelineSegment, Parameter, Formula } from '../types';
import { getCviCategory } from '../utils/vulnerabilityMapping';

interface CviStatistics {
  min: string;
  max: string;
  avg: string;
  count: number;
  totalSegments: number;
  categories: {
    veryLow: number;
    low: number;
    moderate: number;
    high: number;
    veryHigh: number;
  };
}

const generateCategoryDistributionData = (statistics: CviStatistics | null) => {
  if (!statistics) return [];

  return [
    { name: 'Very Low', value: statistics.categories.veryLow, color: '#4caf50' },
    { name: 'Low', value: statistics.categories.low, color: '#8bc34a' },
    { name: 'Moderate', value: statistics.categories.moderate, color: '#ffeb3b' },
    { name: 'High', value: statistics.categories.high, color: '#ff9800' },
    { name: 'Very High', value: statistics.categories.veryHigh, color: '#f44336' }
  ].filter(item => item.value > 0); // Only include categories with values
};

const generateVulnerabilityProfileData = (segments: ShorelineSegment[]) => {
  if (segments.length === 0) return [];

  // Get segments with vulnerability scores - exactly match the results page implementation
  const segmentsWithScores = segments
    .filter(s => s.properties.vulnerabilityIndex !== undefined)
    .map((segment, index) => {
      const score = segment.properties.vulnerabilityIndex || 0;
      const category = getCviCategory(score, segment.properties.vulnerabilityFormula);

      // Use the exact same color mapping as in the results page
      const CATEGORY_COLORS = {
        'Very Low': '#4caf50',  // Green
        'Low': '#8bc34a',       // Light Green
        'Moderate': '#ffeb3b',  // Yellow
        'High': '#ff9800',      // Orange
        'Very High': '#f44336', // Red
        'No Data': '#9e9e9e'    // Gray
      };

      const color = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#9e9e9e';

      return {
        id: segment.id,
        index,
        score,
        category,
        color,
        displayId: `${index+1}`
      };
    })
    .sort((a, b) => a.index - b.index);

  // Calculate moving average (window size of 5) - exactly match the results page implementation
  const windowSize = Math.min(5, Math.max(3, Math.floor(segmentsWithScores.length / 10)));
  const movingAvg: number[] = [];

  for (let i = 0; i < segmentsWithScores.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, i - Math.floor(windowSize/2));
         j <= Math.min(segmentsWithScores.length - 1, i + Math.floor(windowSize/2)); j++) {
      sum += segmentsWithScores[j].score;
      count++;
    }

    movingAvg.push(sum / count);
  }

  // Add moving average to data - exactly match the results page implementation
  return segmentsWithScores.map((item, index) => ({
    ...item,
    movingAvg: movingAvg[index].toFixed(2),
    movingAvgNum: movingAvg[index]
  }));
};

export const generateHtmlReport = (
  segments: ShorelineSegment[],
  parameters: Parameter[],
  statistics: CviStatistics | null,
  formula: Formula | null,
  mapImageDataUrl: string
): string => {
  const timestamp = new Date().toLocaleString();
  const title = 'Coastal Vulnerability Index (CVI) Report';
  const categoryDistributionData = generateCategoryDistributionData(statistics);
  const vulnerabilityProfileData = generateVulnerabilityProfileData(segments);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <!-- Use Chart.js instead of Recharts for better compatibility in static HTML reports -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
  <script>
    // Ensure Chart.js is properly loaded
    window.addEventListener('load', function() {
      if (!window.Chart) {
        console.error('Chart.js library not loaded properly');
        document.querySelectorAll('.chart-loading').forEach(function(el) {
          el.textContent = 'Chart library failed to load. Please try refreshing the page.';
        });
      }
    });
  </script>
  <style>
    /* Base styles with improved typography */
    body {
      font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #2d3748;
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px;
      background-color: #f7f9fc;
    }

    /* Modern container styling */
    .container {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      margin-bottom: 30px;
    }

    /* Professional header with gradient */
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }

    .title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
    }

    /* Content section styling */
    .content {
      padding: 30px;
    }

    /* Improved map container */
    .map-container {
      margin-bottom: 30px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .map-image {
      width: 100%;
      display: block;
      max-height: 600px;
      object-fit: contain;
      background-color: #f8fafc;
    }

    .map-caption {
      padding: 15px;
      background-color: #f1f5f9;
      font-size: 14px;
      color: #475569;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }

    /* Modern grid layout */
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      margin-bottom: 30px;
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    /* Card styling with subtle shadows */
    .card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      padding: 25px;
      height: 100%;
    }

    .card-title {
      font-size: 20px;
      font-weight: 600;
      color: #1e3a8a;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e5e7eb;
      position: relative;
    }

    .card-title::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, #2563eb, #3b82f6);
    }

    /* Statistics styling */
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 15px;
    }

    .stat-item {
      background-color: #f8fafc;
      border-radius: 8px;
      padding: 15px;
      transition: transform 0.2s;
    }

    .stat-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    .stat-label {
      font-size: 13px;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 22px;
      font-weight: 600;
      color: #0f172a;
    }

    /* Categories styling */
    .categories {
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }

    .category-label {
      font-size: 13px;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 15px;
      letter-spacing: 0.5px;
      font-weight: 600;
    }

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px 12px;
      border-radius: 6px;
      transition: background-color 0.2s;
    }

    .category-item:hover {
      background-color: #f8fafc;
    }

    .category-name {
      display: flex;
      align-items: center;
    }

    .category-color {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      margin-right: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .category-count {
      font-weight: 600;
      background-color: #f1f5f9;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 14px;
    }

    /* Legend styling */
    .legend {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 25px;
    }

    @media (max-width: 500px) {
      .legend {
        grid-template-columns: 1fr;
      }
    }

    .legend-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: 6px;
      transition: background-color 0.2s;
    }

    .legend-item:hover {
      background-color: #f8fafc;
    }

    .legend-color {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      margin-right: 10px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .legend-label {
      font-size: 14px;
      color: #334155;
      font-weight: 500;
    }

    .legend-rank {
      font-size: 12px;
      color: #64748b;
      margin-left: 6px;
    }

    /* Parameters styling */
    .parameters-list {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    @media (max-width: 500px) {
      .parameters-list {
        grid-template-columns: 1fr;
      }
    }

    .parameter-item {
      padding: 10px;
      border-radius: 6px;
      background-color: #f8fafc;
      transition: transform 0.2s;
    }

    .parameter-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }

    .parameter-name {
      font-weight: 600;
      color: #334155;
      display: block;
      margin-bottom: 2px;
    }

    .parameter-weight {
      color: #64748b;
      font-size: 13px;
    }

    /* Footer styling */
    .footer {
      text-align: center;
      padding: 20px;
      color: #64748b;
      font-size: 13px;
      border-top: 1px solid #e2e8f0;
    }

    .footer p {
      margin: 0;
    }

    /* Charts section */
    .charts-section {
      margin-top: 40px;
      width: 100%;
    }

    /* Chart styling */
    .chart-container {
      height: 450px;
      margin-top: 20px;
      margin-bottom: 30px;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .chart-title {
      font-size: 16px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 15px;
      text-align: left;
    }

    .chart-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #64748b;
      font-size: 14px;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 8px 12px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    /* Print optimization */
    @media print {
      body {
        padding: 0;
        background: white;
      }

      .container {
        box-shadow: none;
      }

      .header {
        background: #2563eb !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .card {
        box-shadow: none;
        border: 1px solid #e5e7eb;
      }

      .map-container {
        box-shadow: none;
        border: 1px solid #e5e7eb;
      }

      .chart-container {
        box-shadow: none;
        border: 1px solid #e5e7eb;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">${title}</h1>
      <p class="subtitle">Generated on ${timestamp}</p>
    </div>

    <div class="content">
      <div class="map-container">
        <img src="${mapImageDataUrl}" alt="CVI Map" class="map-image">
        <div class="map-caption">
          Shoreline segments colored by calculated CVI score. Formula used: ${formula?.name || 'Unknown'}
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <h2 class="card-title">Summary Statistics</h2>
          ${statistics ? `
            <p style="color: #64748b; font-size: 14px; margin-bottom: 15px;">
              Calculated for <span style="font-weight: 600;">${statistics.count}</span> of <span style="font-weight: 600;">${statistics.totalSegments}</span> segments.
            </p>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-label">Min CVI</div>
                <div class="stat-value">${statistics.min}</div>
              </div>
              <div class="stat-item">
                <div class="stat-label">Max CVI</div>
                <div class="stat-value">${statistics.max}</div>
              </div>
              <div class="stat-item" style="grid-column: span 2">
                <div class="stat-label">Average CVI</div>
                <div class="stat-value">${statistics.avg}</div>
              </div>
            </div>
            <div class="categories">
              <div class="category-label">Segment Counts by Category</div>
              <div class="category-item">
                <div class="category-name">
                  <div class="category-color" style="background-color: #1a9850; border-color: #15803d;"></div>
                  <span>Very Low</span>
                </div>
                <div class="category-count">${statistics.categories.veryLow}</div>
              </div>
              <div class="category-item">
                <div class="category-name">
                  <div class="category-color" style="background-color: #91cf60; border-color: #65a30d;"></div>
                  <span>Low</span>
                </div>
                <div class="category-count">${statistics.categories.low}</div>
              </div>
              <div class="category-item">
                <div class="category-name">
                  <div class="category-color" style="background-color: #fee08b; border-color: #eab308;"></div>
                  <span>Moderate</span>
                </div>
                <div class="category-count">${statistics.categories.moderate}</div>
              </div>
              <div class="category-item">
                <div class="category-name">
                  <div class="category-color" style="background-color: #fc8d59; border-color: #ea580c;"></div>
                  <span>High</span>
                </div>
                <div class="category-count">${statistics.categories.high}</div>
              </div>
              <div class="category-item">
                <div class="category-name">
                  <div class="category-color" style="background-color: #d73027; border-color: #b91c1c;"></div>
                  <span>Very High</span>
                </div>
                <div class="category-count">${statistics.categories.veryHigh}</div>
              </div>
            </div>



            <script>
              // Wait for Chart.js to load
              window.addEventListener('load', function() {
                if (!window.Chart) {
                  console.error('Chart.js not loaded');
                  return;
                }

                // Category Distribution Chart
                const categoryData = ${JSON.stringify(categoryDistributionData)};

                if (categoryData.length > 0) {
                  const ctx = document.getElementById('categoryChart').getContext('2d');

                  new Chart(ctx, {
                    type: 'bar',
                    data: {
                      labels: categoryData.map(item => item.name),
                      datasets: [{
                        label: 'Segments',
                        data: categoryData.map(item => item.value),
                        backgroundColor: categoryData.map(item => item.color),
                        borderColor: categoryData.map(item => item.color),
                        borderWidth: 1,
                        barPercentage: 0.8,
                        categoryPercentage: 0.9
                      }]
                    },
                    options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      layout: {
                        padding: {
                          left: 10,
                          right: 10,
                          top: 0,
                          bottom: 10
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: false
                          },
                          ticks: {
                            padding: 5,
                            color: '#64748b'
                          },
                          title: {
                            display: true,
                            text: 'Segments',
                            color: '#334155',
                            font: {
                              weight: '600',
                              size: 12
                            },
                            padding: {
                              bottom: 10
                            }
                          }
                        },
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false
                          },
                          ticks: {
                            padding: 8,
                            color: '#64748b'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          titleColor: '#334155',
                          bodyColor: '#334155',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: 1,
                          padding: 10,
                          cornerRadius: 4,
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          callbacks: {
                            label: function(context) {
                              return context.parsed.y + ' segments';
                            }
                          }
                        }
                      }
                    }
                  });

                  document.getElementById('categoryChartLoading').style.display = 'none';
                }

                // Vulnerability Profile Chart
                const profileData = ${JSON.stringify(vulnerabilityProfileData)};

                if (profileData.length > 0) {
                  const ctx = document.getElementById('profileChart').getContext('2d');

                  // Determine x-axis labels with appropriate interval
                  const interval = Math.max(1, Math.floor(profileData.length / 20));
                  const labels = profileData.map((item, index) =>
                    index % interval === 0 ? item.displayId : ''
                  );

                  // Create horizontal reference lines data
                  const referenceLines = [
                    { y: 1.5, color: '#4caf50' },
                    { y: 2.5, color: '#ffeb3b' },
                    { y: 3.5, color: '#ff9800' },
                    { y: 4.5, color: '#f44336' }
                  ];

                  new Chart(ctx, {
                    type: 'scatter',
                    data: {
                      labels: profileData.map(item => item.displayId),
                      datasets: [
                        // Reference lines (hidden in legend) - draw these first so they appear behind the points
                        ...referenceLines.map(line => ({
                          type: 'line',
                          label: '',
                          data: [
                            { x: 0, y: line.y },
                            { x: profileData.length - 1, y: line.y }
                          ],
                          borderColor: line.color,
                          borderWidth: 1,
                          borderDash: [3, 3],
                          pointRadius: 0,
                          fill: false,
                          tension: 0
                        })),
                        // Line for moving average - draw this second so it appears above reference lines but below points
                        {
                          type: 'line',
                          label: 'Moving Average',
                          data: profileData.map((item, index) => ({
                            x: index,
                            y: item.movingAvgNum || parseFloat(item.movingAvg)
                          })),
                          borderColor: '#000000',
                          borderWidth: 2,
                          pointRadius: 0,
                          fill: false,
                          tension: 0.1,
                          borderDash: []
                        },
                        // Scatter plot for CVI scores - draw this last so points appear on top
                        {
                          type: 'scatter',
                          label: 'CVI Score',
                          data: profileData.map((item, index) => ({
                            x: index,
                            y: item.score
                          })),
                          backgroundColor: profileData.map(item => item.color),
                          borderColor: profileData.map(item => item.color),
                          pointRadius: 6,
                          pointHoverRadius: 8,
                          pointStyle: 'circle',
                          hoverBorderWidth: 2,
                          hoverBorderColor: 'rgba(0, 0, 0, 0.5)'
                        }
                      ]
                    },
                    options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      layout: {
                        padding: {
                          left: 30,
                          right: 30,
                          top: 20,
                          bottom: 40
                        }
                      },
                      scales: {
                        x: {
                          type: 'linear',
                          min: 0,
                          max: profileData.length - 1,
                          offset: true,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: true,
                            lineWidth: 1
                          },
                          border: {
                            display: true,
                            width: 1,
                            color: 'rgba(0, 0, 0, 0.3)'
                          },
                          title: {
                            display: true,
                            text: 'Segment',
                            padding: {top: 15, bottom: 0},
                            font: {
                              weight: '600',
                              size: 12
                            },
                            color: '#334155'
                          },
                          ticks: {
                            // Generate specific tick values at fixed intervals
                            callback: function(val, index) {
                              // Get the actual index in the data array
                              const dataIndex = Math.round(val);

                              // Only show labels at specific positions
                              // This matches the behavior in the results page
                              if (dataIndex >= 0 && dataIndex < profileData.length) {
                                // For a dataset with ~130 points, show labels at positions like 1, 8, 15, 22, etc.
                                // This creates labels like 1, 8, 15, 22, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99, 106, 113, 120, 127
                                const fixedPositions = [];

                                // Calculate positions to show labels at
                                // Start at 0 (segment 1) and increment by a fixed amount
                                const totalSegments = profileData.length;
                                const numLabels = 19; // Match the number in the results page
                                const step = Math.max(1, Math.floor(totalSegments / numLabels));

                                for (let i = 0; i < totalSegments; i += step) {
                                  fixedPositions.push(i);
                                }

                                // Add the last segment if it's not already included
                                if (fixedPositions[fixedPositions.length - 1] !== totalSegments - 1) {
                                  fixedPositions.push(totalSegments - 1);
                                }

                                // Check if current index is in our fixed positions
                                if (fixedPositions.includes(dataIndex)) {
                                  return profileData[dataIndex].displayId;
                                }
                              }
                              return '';
                            },
                            padding: 8,
                            color: '#64748b',
                            font: {
                              size: 11
                            },
                            autoSkip: false
                          }
                        },
                        y: {
                          min: 1,
                          max: 5,
                          offset: true,
                          grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: true,
                            lineWidth: 1
                          },
                          border: {
                            display: true,
                            width: 1,
                            color: 'rgba(0, 0, 0, 0.3)'
                          },
                          ticks: {
                            stepSize: 1,
                            padding: 8,
                            color: '#64748b',
                            font: {
                              size: 11
                            }
                          },
                          title: {
                            display: true,
                            text: 'CVI Score',
                            padding: {bottom: 10},
                            font: {
                              weight: '600',
                              size: 12
                            },
                            color: '#334155'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          enabled: true,
                          backgroundColor: 'rgba(255, 255, 255, 0.98)',
                          titleColor: '#334155',
                          bodyColor: '#3b82f6',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: 1,
                          padding: {
                            top: 8,
                            right: 12,
                            bottom: 8,
                            left: 12
                          },
                          cornerRadius: 6,
                          displayColors: false,
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          mode: 'nearest',
                          intersect: true,
                          callbacks: {
                            // Filter tooltips to only show for data points
                            filter: function(tooltipItem) {
                              return tooltipItem.datasetIndex === 2; // Only show for CVI Score dataset
                            },
                            title: function(tooltipItems) {
                              if (tooltipItems.length === 0) return '';

                              const index = tooltipItems[0].dataIndex;
                              if (index >= 0 && index < profileData.length) {
                                const segmentId = profileData[index].displayId;
                                const category = profileData[index].category;
                                return 'Segment ' + segmentId + ' (' + category + ')';
                              }
                              return '';
                            },
                            label: function(context) {
                              if (context.datasetIndex === 2) {
                                return 'CVI Score: ' + context.parsed.y.toFixed(2);
                              }
                              return null;
                            }
                          }
                        }
                      },
                      animation: {
                        duration: 0 // Disable animations for better performance
                      },
                      elements: {
                        point: {
                          radius: 6,
                          hoverRadius: 8,
                          hitRadius: 10,
                          borderWidth: 0
                        },
                        line: {
                          tension: 0.1,
                          borderWidth: 2
                        }
                      }
                    }
                  });

                  document.getElementById('profileChartLoading').style.display = 'none';
                }
              });
            </script>
          ` : `<p>No CVI statistics available.</p>`}
        </div>

        <div class="card">
          <h2 class="card-title">Map Legend</h2>
          <div class="legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: #1a9850; border-color: #15803d;"></div>
              <span class="legend-label">Very Low</span>
              <span class="legend-rank">(Rank 1)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #91cf60; border-color: #65a30d;"></div>
              <span class="legend-label">Low</span>
              <span class="legend-rank">(Rank 2)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #fee08b; border-color: #eab308;"></div>
              <span class="legend-label">Moderate</span>
              <span class="legend-rank">(Rank 3)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #fc8d59; border-color: #ea580c;"></div>
              <span class="legend-label">High</span>
              <span class="legend-rank">(Rank 4)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #d73027; border-color: #b91c1c;"></div>
              <span class="legend-label">Very High</span>
              <span class="legend-rank">(Rank 5)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #9ca3af; border-color: #6b7280;"></div>
              <span class="legend-label">No Data / Error</span>
              <span class="legend-rank">(Rank N/A)</span>
            </div>
          </div>

          <h3 class="card-title" style="margin-top: 30px;">Parameters Used</h3>
          <div class="parameters-list">
            ${parameters.filter(p => p.enabled && p.weight > 0).map(param => `
              <div class="parameter-item">
                <span class="parameter-name">${param.name}</span>
                <span class="parameter-weight">(Weight: ${param.weight})</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      ${statistics ? `
      <!-- Charts Section - Full Width -->
      <div class="charts-section">
        <!-- Category Distribution Chart -->
        <div class="chart-container">
          <h3 class="chart-title">CVI Category Distribution</h3>
          <canvas id="categoryChart" style="width: 100%; height: 300px;"></canvas>
          <div id="categoryChartLoading" class="chart-loading">Loading chart...</div>
        </div>

        <!-- Vulnerability Profile Chart -->
        <div class="chart-container">
          <h3 class="chart-title">Vulnerability Profile Along Shoreline</h3>
          <canvas id="profileChart" style="width: 100%; height: 400px;"></canvas>
          <div id="profileChartLoading" class="chart-loading">Loading chart...</div>
        </div>
      </div>
      ` : ''}
    </div>

    <div class="footer">
      <p>Generated by CVIc - Coastal Vulnerability Index Compiler</p>
    </div>
  </div>
</body>
</html>
  `;
};

export const captureMapAsImage = (mapElement: HTMLElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    import('html2canvas').then(html2canvasModule => {
      const html2canvas = html2canvasModule.default;

      const mapInstance = (window as any).L?.Maps?.[0] || null;

      if (mapInstance) {
        console.log("Found Leaflet map instance, preparing for capture...");

        try {
          const originalZoom = mapInstance.getZoom();
          const originalCenter = mapInstance.getCenter();
          const originalAnimationState = mapInstance.options.animate;
          mapInstance.options.animate = false;
          mapInstance.invalidateSize({ animate: false });
          Object.values(mapInstance._layers).forEach((layer: any) => {
            if (layer.feature || (layer.getLayers && typeof layer.getLayers === 'function')) {
              if (layer.bringToFront && typeof layer.bringToFront === 'function') {
                layer.bringToFront();
              }
            }
          });

          const styleTag = document.createElement('style');
          styleTag.innerHTML = `
            .leaflet-pane { transition: none !important; }
            .leaflet-overlay-pane { z-index: 650 !important; }
            .leaflet-marker-pane { z-index: 600 !important; }
          `;
          document.head.appendChild(styleTag);

          setTimeout(() => {
            html2canvas(mapElement, {
              useCORS: true,
              allowTaint: true,
              scale: 2,
              backgroundColor: null,
              imageTimeout: 30000,
              ignoreElements: (element: Element) => {
                return element.classList?.contains('leaflet-control-container') ||
                       element.classList?.contains('leaflet-control') ||
                       element.classList?.contains('leaflet-control-zoom');
              }
            }).then((canvas: HTMLCanvasElement) => {
              document.head.removeChild(styleTag);
              mapInstance.options.animate = originalAnimationState;
              mapInstance.setView(originalCenter, originalZoom, { animate: false });
              const dataUrl = canvas.toDataURL('image/png');
              console.log("Map capture completed successfully");
              resolve(dataUrl);
            }).catch((err: Error) => {
              if (document.head.contains(styleTag)) {
                document.head.removeChild(styleTag);
              }
              mapInstance.options.animate = originalAnimationState;
              mapInstance.setView(originalCenter, originalZoom, { animate: false });
              console.error('Error capturing map with html2canvas:', err);
              reject(err);
            });
          }, 500);
        } catch (err) {
          console.warn("Error preparing map:", err);
          simpleCapture(mapElement, html2canvas).then(resolve).catch(reject);
        }
      } else {
        console.warn("Could not find Leaflet map instance, using simple capture");
        simpleCapture(mapElement, html2canvas).then(resolve).catch(reject);
      }
    }).catch((err: Error) => {
      console.error('Error importing html2canvas:', err);
      reject(err);
    });
  });
};

const simpleCapture = (mapElement: HTMLElement, html2canvas: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    console.log("Using simple html2canvas capture");
    html2canvas(mapElement, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      backgroundColor: null,
      imageTimeout: 30000,
      ignoreElements: (element: Element) => {
        return element.classList?.contains('leaflet-control-container') ||
               element.classList?.contains('leaflet-control') ||
               element.classList?.contains('leaflet-control-zoom');
      }
    }).then((canvas: HTMLCanvasElement) => {
      const dataUrl = canvas.toDataURL('image/png');
      console.log("Simple capture completed successfully");
      resolve(dataUrl);
    }).catch((err: Error) => {
      console.error('Error in simple capture:', err);
      reject(err);
    });
  });
};
