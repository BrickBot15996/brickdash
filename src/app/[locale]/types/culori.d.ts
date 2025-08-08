declare module "culori" {
  // OKLCH color space representation
  export interface OklchColor {
    mode: "oklch";
    l: number; // Lightness: 0-1
    c: number; // Chroma: 0-0.4 (approximately)
    h?: number; // Hue: 0-360 (optional as it might be undefined for achromatic colors)
    alpha?: number; // Alpha channel: 0-1 (optional)
  }

  // RGB color space representation (for completeness)
  export interface RgbColor {
    mode: "rgb";
    r: number; // Red: 0-1
    g: number; // Green: 0-1
    b: number; // Blue: 0-1
    alpha?: number; // Alpha channel: 0-1 (optional)
  }

  export interface HslColor {
    mode: "hsl";
    h: number; // Hue: 0-360
    s: number; // Saturation: 0-1
    l: number; // Lightness: 0-1
    alpha?: number; // Alpha channel: 0-1 (optional)
  }

  export interface LabColor {
    mode: "lab";
    l: number; // Lightness: 0-100
    a: number; // Green-Red: -128 to 127
    b: number; // Blue-Yellow: -128 to 127
    alpha?: number; // Alpha channel: 0-1 (optional)
  }

  // Union type for various color representations
  export type Color = OklchColor | RgbColor | string;

  /**
   * Converts a color to OKLCH color space
   * @param color - Input color in any supported format (hex string, rgb object, etc.)
   * @returns OKLCH color object with mutable properties for arithmetic operations
   */
  export function oklch(color: Color): OklchColor;

  /**
   * Formats a color object to a CSS-compatible string
   * @param color - Color object to format
   * @returns CSS color string (e.g., "oklch(0.5 0.2 120)" or "rgb(255, 0, 0)")
   */
  export function formatCss(color: Color): string;

  // Additional commonly used functions you might need
  export function parse(color: string): Color | undefined;
  export function rgb(color: Color): RgbColor;
  export function hsl(color: Color): HslColor;
  export function lab(color: Color): LabColor;

  // Color manipulation functions
  export function interpolate(
    colors: Color[],
    mode?: string
  ): (t: number) => Color;
  export function samples(
    n: number
  ): (interpolator: (t: number) => Color) => Color[];
  export function clampChroma(color: Color, mode?: string): Color;
}
