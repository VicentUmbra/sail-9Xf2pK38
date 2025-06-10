

const scriptsInEvents = {

	async Events_sea_Event26_Act1(runtime, localVars)
	{
		// Get object instance (assuming only one of each for now)
		const sail = runtime.objects.GUI_SailDirection.getFirstInstance();
		const wind = runtime.objects.GUI_WindDirection.getFirstInstance();
		
		if (!sail || !wind) return;
		
		// Convert radians to degrees
		function toDegrees(radians) {
		    return radians * (180 / Math.PI);
		}
		
		const sailAngle = toDegrees(sail.angle);
		const windAngle = toDegrees(wind.angle);
		
		// Access thresholds
		const perfect = sail.instVars.Wind_WindAngleThresholdPerfect;
		const good = sail.instVars.Wind_WindAngleThresholdGood;
		
		// Angle difference (shortest arc between angles)
		function angleDifference(a, b) {
		    return Math.abs((((a - b + 180) % 360 + 360) % 360) - 180);
		}
		
		const diff = angleDifference(windAngle, sailAngle);
		console.log("Sail:", sailAngle.toFixed(2), "Wind:", windAngle.toFixed(2), "Diff:", diff.toFixed(2));
		
		// Set threshold
		if (diff <= perfect) {
		    sail.instVars.Wind_CurrentThreshold = 2;
		} else if (diff <= good) {
		    sail.instVars.Wind_CurrentThreshold = 1;
		} else {
		    sail.instVars.Wind_CurrentThreshold = 0;
		}
		
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
