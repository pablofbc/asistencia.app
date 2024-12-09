import axios from 'axios';

// Configura tu API Key y URL de Google Sheets
const SHEET_ID = '1mZ78x0BcfO2KLaASWaDZG5rjMT6-SDYzS-AK5Go4E7E';
const API_KEY = 'AIzaSyBWE6Os41t4U_DYg_ekv2o81fyVRh8utK0';
const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}`;

export const fetchSheetData = async (sheetName: string, range: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/values/${sheetName}!${range}?key=${API_KEY}`
    );
    return response.data.values ? response.data.values[0] : null;
  } catch (err) {
    console.error('Error fetching data:', err);
    return null;
  }
};

export const updateSheet = async (sheetName: string, rowData: Record<string, string>) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/values/${sheetName}:append?valueInputOption=RAW&key=${API_KEY}`,
      {
        range: sheetName,
        majorDimension: 'ROWS',
        values: [Object.values(rowData)],
      }
    );
    return response.data.updates;
  } catch (err) {
    console.error('Error updating data:', err);
    throw err;
  }
};

export const readCell = async (
    sheetName: string,
    range: string
  ): Promise<string | null> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/values/${sheetName}!${range}?key=${API_KEY}`
      );
    //console.log(response.data.values);
    const values = JSON.parse(response.data.values); // response.data.values;
    //console.log("Values: ", values);
    return values;
    } catch (error) {
      console.error("Error leyendo Google Sheets:", error);
      return null;
    }
  };
