export const BOOTSTRAP_BREAKPOINTS = {
	"SMALL": "SMALL",
	"MEDIUM": "MEDIUM",
	"LARGE": "LARGE",
	"EXTRA_LARGE": "EXTRA_LARGE",
};

const BOOTSTRAP_BREAKPOINT_MEDIA_QUERIES = {
	"SMALL": "(min-width: 576px)",
	"MEDIUM": "(min-width: 768px)",
	"LARGE": "(min-width: 992px)",
	"EXTRA_LARGE": "(min-width: 1200px)",
};

/**
 * Given a bootstrap breakpoint, will return true if it matches. For example:
 *
 *    cheakBreakpoint("SMALL") will return true if the window width is at least
 *    576px and false otherwise.
 */
export function checkBreakpoint( bootstrapBreakpoint ) {

	if ( !BOOTSTRAP_BREAKPOINT_MEDIA_QUERIES[bootstrapBreakpoint] ) {
		return undefined;
	}
	
	const mq = window.matchMedia(BOOTSTRAP_BREAKPOINT_MEDIA_QUERIES[bootstrapBreakpoint]);

	if ( mq.matches ) {
		return true;
	} else {
		return false;
	}
}
