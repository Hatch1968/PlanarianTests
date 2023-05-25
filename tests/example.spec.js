// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');

async function readCredentialsFromJson() {
  try {
    // Read the JSON file
    const fileData = fs.readFileSync('credentials.json');
   
    const credentials = JSON.parse(fileData);
  
    const username = credentials.username;
    const password = credentials.password;

	console.log('Login Email: ', username);
    return { username, password };
  } catch (error) {
    console.error('Error reading credentials:', error);
    return null;
  }
}

async function generateRandomStringWithNumber() {
  const randomString = 'Automation_' + Math.floor(Math.random() * 1000000000);
  return randomString;
}


test('Planarian Login/Logout', async ({ page }) => {
	await page.goto('https://www.planarian.xyz/login');

	const { username, password } = await readCredentialsFromJson();
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Planarian/);
	await expect(page).toHaveURL(/.*login/);
  
	
	await page.fill('#basic_emailAddress', username);
    await page.fill('#basic_password', password);
    await page.click('button span:has-text("Login")');

	await expect(page).toHaveURL(/.*projects/);
  
	await page.click('span:has-text("Logout")');
	await expect(page).toHaveURL(/.*login/);
	
  
});


// Note: This Test is currently broken
test('Planarian Add/Delete New Project', async ({ page }) => {
	await page.goto('https://www.planarian.xyz/login');

	const { username, password } = await readCredentialsFromJson();
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Planarian/);
	await expect(page).toHaveURL(/.*login/);
  
  
	await page.fill('#basic_emailAddress', username);
    await page.fill('#basic_password', password);
    await page.click('button span:has-text("Login")');

	await expect(page).toHaveURL(/.*projects/);
  
	//await page.click('button span:has-text("Add")');
	
	//await expect(page.locator("text=New Project")).toBeVisible();

	//const newProjectName = await generateRandomStringWithNumber();

	const newProjectName = "Automation_480705429";

	console.log('Project Name: ', newProjectName);
	/*
	await page.fill('#Name', newProjectName);
	
	await page.click('button span:has-text("OK")');
	*/
	//await page.waitForSelector(`div:has-text("${newProjectName}")`);
	//
	
	const hrefValue = await page.evaluate((text) => {
  const divElements = Array.from(document.querySelectorAll('div'));
  const targetDivIndex = divElements.findIndex((div) => div.textContent.includes(text));
  if (targetDivIndex !== -1 && targetDivIndex > 0) {
    const precedingHref = divElements[targetDivIndex - 1].previousElementSibling.getAttribute('href');
    return precedingHref;
  }
  return null;
}, newProjectName);

console.log('First preceding href value:', hrefValue);
	
	//await page.waitForSelector('div:has-text("Project Members")');
	//await page.click('span:has-text("Delete")');
	//await page.waitForSelector('button span:has-text("OK")');
	//await page.click('button span:has-text("OK")');

	//await expect(page.locator("text=Projects")).toBeVisible();
	
	// Logout 
	await page.click('span:has-text("Logout")');
	await expect(page).toHaveURL(/.*login/);
	
  
});


