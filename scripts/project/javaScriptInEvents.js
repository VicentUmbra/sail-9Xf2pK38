

const scriptsInEvents = {

	async Events_sea_Event62_Act1(runtime, localVars)
	{
		const sail = runtime.objects.GUI_SailDirection.getFirstInstance();
		const wind = runtime.objects.GUI_WindDirection.getFirstInstance();
		if (!sail || !wind) return;
		
		const toDegrees = r => r * (180 / Math.PI);
		const sailAngle = toDegrees(sail.angle);
		const windAngle = toDegrees(wind.angle);
		
		// Shortest arc
		function angleDifference(a, b) {
		    return Math.abs((((a - b + 180) % 360 + 360) % 360) - 180);
		}
		
		const diff = angleDifference(windAngle, sailAngle);
		
		// Margins
		const perfectMargin = 30;
		const oppositeMargin = 15;
		
		// State assignment
		if (diff <= perfectMargin) {
		    sail.instVars.boatAngle_state = 2;  // Perfect alignment (wider margin)
		} else if (Math.abs(diff - 180) <= oppositeMargin) {
		    sail.instVars.boatAngle_state = 0;  // Facing into wind (tighter margin)
		} else {
		    sail.instVars.boatAngle_state = 1;  // All other angles
		}
		
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
