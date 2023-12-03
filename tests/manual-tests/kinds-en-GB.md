[//]: # (cspell:disable - derived document, no need for spell checking)
# Ortac Quantity Kinds Manual Test Plan (en-GB)
This test plan is designed to be completed by hand. Each test sets out what the test is, and what a pass of the test requires.
## Test 1: Unit Names
Unit names should be plural and should complete the sentence `*quantity* is measured in *Units*`, for example `Temperature is measured in Degrees Celsius`.
The capitalisation should follow the convention for the language represented, but in particular capitalisation in English should be in accordance with [The International System of Units (SI) (9th edition 2019)](../SI-Brochure-9-EN.pdf).
This test lists the en-GB language version. It can be compared to other languages using a diff tool as the layout is identical for each language.
The specific items to test/check:
- The suffix usually has a half space separator to the number, but there are exceptions eg. 21.1°C
- The suffix is always stated in the plural
- The capitalisation of the unit is usually lower case, eg. the only SI unit with upper case letters is `degree Celsius`
- The unit is stated in the singular, but is measured in the plural
- The use of a `-` in names is difficult to define, but must be used consistently and where it is in common usage, eg. `foot-pounds`. Cite dictionary references when used.
### Time Interval
- **second**: Time Interval is measured in seconds eg. '1.0 s' (SI Unit)
- **minute**: Time Interval is measured in minutes eg. '1.0 mins = 60 s', and '1.0 s = 0.016666666666666666 mins'
- **hour**: Time Interval is measured in hours eg. '1.0 hrs = 3600 s', and '1.0 s = 0.0002777777777777778 hrs'
- **day**: Time Interval is measured in days eg. '1.0 days = 86400 s', and '1.0 s = 0.000011574074074074073 days'
### Length
- **metre**: Length is measured in metres eg. '1.0 m' (SI Unit)
- **centimetre**: Length is measured in centimetres eg. '1.0 cm = 0.01 m', and '1.0 m = 100 cm'
- **millimetre**: Length is measured in millimetres eg. '1.0 mm = 0.001 m', and '1.0 m = 1000 mm'
- **kilometre**: Length is measured in kilometres eg. '1.0 km = 1000 m', and '1.0 m = 0.001 km'
- **nautical mile**: Length is measured in nautical miles eg. '1.0 Nm = 1852 m', and '1.0 m = 0.0005399568034557236 Nm'
- **statute mile**: Length is measured in statute miles eg. '1.0 miles = 1609.34 m', and '1.0 m = 0.0006213727366498068 miles'
- **inch**: Length is measured in inches eg. '1.0″ = 0.0254 m', and '1.0 m = 39.37007874015748″'
- **foot**: Length is measured in feet eg. '1.0′ = 0.3048 m', and '1.0 m = 3.280839895013123′'
- **yard**: Length is measured in yards eg. '1.0 yd = 0.9144 m', and '1.0 m = 1.0936132983377078 yd'
- **fathom**: Length is measured in fathoms eg. '1.0 fathoms = 1.8288 m', and '1.0 m = 0.5468066491688539 fathoms'
- **shot**: Length is measured in shots eg. '1.0 shots = 27.432 m', and '1.0 m = 0.03645377661125693 shots'
- **cable**: Length is measured in cables eg. '1.0 cables = 185.2 m', and '1.0 m = 0.005399568034557236 cables'
### Mass
- **kilogram**: Mass is measured in kilograms eg. '1.0 kg' (SI Unit)
- **gram**: Mass is measured in grams eg. '1.0 g = 0.001 kg', and '1.0 kg = 1000 g'
- **pound**: Mass is measured in pounds eg. '1.0 lbs = 0.45359237 kg', and '1.0 kg = 2.2046226218487757 lbs'
- **metric ton**: Mass is measured in metric tons eg. '1.0 t = 1000 kg', and '1.0 kg = 0.001 t'
### Electric Current
- **amp**: Electric Current is measured in amps eg. '1.0 A' (SI Unit)
- **milliamp**: Electric Current is measured in milliamps eg. '1.0 mA = 0.001 A', and '1.0 A = 1000 mA'
### Temperature
- **kelvin**: Temperature is measured in kelvin eg. '1.0 K' (SI Unit)
- **degree Celsius**: Temperature is measured in degrees Celsius eg. '1.0°C = 274.15 K', and '1.0 K = -272.15°C'
- **degree Fahrenheit**: Temperature is measured in degrees Fahrenheit eg. '1.0°F = 255.92777777777778 K', and '1.0 K = -457.87°F'
### Luminous Intensity
- **candela**: Luminous Intensity is measured in candelas eg. '1.0 cd' (SI Unit)
### Angle
- **radian**: Angle is measured in radians eg. '1.0 rad' (SI Unit)
- **degree**: Angle is measured in degrees eg. '1.0° = 0.01745329251994336 rad', and '1.0 rad = 57.2957795130821°'
- **rotation**: Angle is measured in rotations eg. '1.0 R = 6.2831853071796 rad', and '1.0 rad = 0.15915494309189498 R'
- **million rotations**: Angle is measured in million rotations eg. '1.0 MR = 6283185.3071796 rad', and '1.0 rad = 1.59154943091895e-7 MR'
### Frequency
- **hertz**: Frequency is measured in hertz eg. '1.0 Hz' (SI Unit)
- **kilohertz**: Frequency is measured in kilohertz eg. '1.0 kHz = 1000 Hz', and '1.0 Hz = 0.001 kHz'
- **megahertz**: Frequency is measured in megahertz eg. '1.0 MHz = 1000000 Hz', and '1.0 Hz = 0.000001 MHz'
### Force
- **newton**: Force is measured in newtons eg. '1.0 N' (SI Unit)
- **kilogram force**: Force is measured in kilograms force eg. '1.0 kgf = 9.80665 N', and '1.0 N = 0.10197162129779283 kgf'
- **pound-force**: Force is measured in pounds-force eg. '1.0 lbf = 4.448221615 N', and '1.0 N = 0.22480894311287594 lbf'
### Pressure
- **pascal**: Pressure is measured in pascals eg. '1.0 Pa' (SI Unit)
- **pound per square inch**: Pressure is measured in pounds per square inch eg. '1.0 psi = 6894.413789 Pa', and '1.0 Pa = 0.00014504496402514955 psi'
- **kilopascal**: Pressure is measured in kilopascals eg. '1.0 kPa = 1000 Pa', and '1.0 Pa = 0.001 kPa'
- **hectopascal**: Pressure is measured in hectopascals eg. '1.0 hPa = 100 Pa', and '1.0 Pa = 0.01 hPa'
- **micropascal**: Pressure is measured in micropascals eg. '1.0 μPa = 0.000001 Pa', and '1.0 Pa = 1000000 μPa'
- **bar**: Pressure is measured in bars eg. '1.0 bar = 100000 Pa', and '1.0 Pa = 0.00001 bar'
- **millibar**: Pressure is measured in millibars eg. '1.0 mbar = 100 Pa', and '1.0 Pa = 0.01 mbar'
- **inch of mercury**: Pressure is measured in inches of mercury eg. '1.0 in Hg = 3386.38642 Pa', and '1.0 Pa = 0.00029530002662838463 in Hg'
- **millimetre of mercury**: Pressure is measured in millimetres of mercury eg. '1.0 mm Hg = 133.3223 Pa', and '1.0 Pa = 0.0075006206763609685 mm Hg'
- **atmosphere**: Pressure is measured in atmospheres eg. '1.0 atm = 101325 Pa', and '1.0 Pa = 0.000009869232667160129 atm'
### Energy
- **joule**: Energy is measured in joules eg. '1.0 J' (SI Unit)
- **foot-pound force**: Energy is measured in foot-pounds force eg. '1.0 ft-lbf = 1.355817899998985 J', and '1.0 J = 0.73756217557 ft-lbf'
- **British thermal unit**: Energy is measured in British thermal units eg. '1.0 Btu = 1055.06 J', and '1.0 J = 0.0009478133944988911 Btu'
- **megajoule**: Energy is measured in megajoules eg. '1.0 MJ = 1000000 J', and '1.0 J = 0.000001 MJ'
- **kilowatt-hour**: Energy is measured in kilowatt-hours eg. '1.0 kWh = 3600 J', and '1.0 J = 0.0002777777777777778 kWh'
- **calorie**: Energy is measured in calories eg. '1.0 cal = 4.1868 J', and '1.0 J = 0.23884589662749595 cal'
- **kilocalorie**: Energy is measured in kilocalories eg. '1.0 kcal = 4186.8 J', and '1.0 J = 0.00023884589662749592 kcal'
### Power
- **watt**: Power is measured in watts eg. '1.0 W' (SI Unit)
- **milliwatt**: Power is measured in milliwatts eg. '1.0 mW = 0.001 W', and '1.0 W = 1000 mW'
- **joule per second**: Power is measured in joules per second eg. '1.0 J/s = 1 W', and '1.0 W = 1 J/s'
- **kilowatt**: Power is measured in kilowatts eg. '1.0 kW = 1000 W', and '1.0 W = 0.001 kW'
- **horsepower**: Power is measured in horsepower eg. '1.0 hp = 745.6998716 W', and '1.0 W = 0.0013410220895631437 hp'
- **metric horsepower**: Power is measured in metric horsepower eg. '1.0 PS = 0.0013596216173039043 W', and '1.0 W = 735.49875 PS'
- **decibel-milliwatts**: Power is measured in decibel-milliwatts eg. '1.0 dBm = 0.01 W', and '1.0 W = 30 dBm'
- **British thermal unit per hour**: Power is measured in British thermal units per hour eg. '1.0 Btu/h = 1055.06 W', and '1.0 W = 0.0009478133944988911 Btu/h'
### Charge
- **coulomb**: Charge is measured in coulombs eg. '1.0 C' (SI Unit)
- **amp-hour**: Charge is measured in amp-hours eg. '1.0 Ah = 3600 C', and '1.0 C = 0.0002777777777777778 Ah'
- **milliamp-hour**: Charge is measured in milliamp-hours eg. '1.0 mAh = 3.6 C', and '1.0 C = 0.2777777777777778 mAh'
### Voltage
- **volt**: Voltage is measured in volts eg. '1.0 V' (SI Unit)
- **millivolt**: Voltage is measured in millivolts eg. '1.0 mV = 0.001 V', and '1.0 V = 1000 mV'
### Capacitance
- **farad**: Capacitance is measured in farads eg. '1.0 F' (SI Unit)
- **microfarad**: Capacitance is measured in microfarads eg. '1.0 μF = 0.000001 F', and '1.0 F = 1000000 μF'
- **picofarad**: Capacitance is measured in picofarads eg. '1.0 pF = 1e-12 F', and '1.0 F = 1000000000000 pF'
### Resistance
- **ohm**: Resistance is measured in ohms eg. '1.0 Ω' (SI Unit)
- **kiloohm**: Resistance is measured in kiloohms eg. '1.0 kΩ = 1000 Ω', and '1.0 Ω = 0.001 kΩ'
- **megaohm**: Resistance is measured in megaohms eg. '1.0 MΩ = 1000000 Ω', and '1.0 Ω = 0.000001 MΩ'
### Conductance
- **siemens**: Conductance is measured in siemens eg. '1.0 S' (SI Unit)
### Magnetic Flux Density
- **tesla**: Magnetic Flux Density is measured in teslas eg. '1.0 T' (SI Unit)
- **nanotesla**: Magnetic Flux Density is measured in nanoteslas eg. '1.0 nT = 1e-9 T', and '1.0 T = 1000000000 nT'
- **gauss**: Magnetic Flux Density is measured in gauss eg. '1.0 G = 0.0001 T', and '1.0 T = 10000 G'
### Inductance
- **henry**: Inductance is measured in henrys eg. '1.0 H' (SI Unit)
- **millihenry**: Inductance is measured in millihenrys eg. '1.0 mH = 0.001 H', and '1.0 H = 1000 mH'
- **microhenry**: Inductance is measured in microhenrys eg. '1.0 μH = 0.000001 H', and '1.0 H = 1000000 μH'
- **nanohenry**: Inductance is measured in nanohenrys eg. '1.0 nH = 1e-9 H', and '1.0 H = 1000000000 nH'
### Illuminance
- **lux**: Illuminance is measured in lux eg. '1.0 lx' (SI Unit)
- **lumen per square metre**: Illuminance is measured in lumens per square metre eg. '1.0 lm/m² = 1 lx', and '1.0 lx = 1 lm/m²'
### Area
- **square metre**: Area is measured in square metres eg. '1.0 m²' (SI Unit)
- **square foot**: Area is measured in square feet eg. '1.0 ft² = 0.09290312990644656 m²', and '1.0 m² = 10.7639 ft²'
- **square mile**: Area is measured in square miles eg. '1.0 mile² = 2590000 m²', and '1.0 m² = 3.861003861003861e-7 mile²'
### Volume
- **cubic metre**: Volume is measured in cubic metres eg. '1.0 m³' (SI Unit)
- **litre**: Volume is measured in litres eg. '1.0 L = 0.001 m³', and '1.0 m³ = 1000 L'
- **cubic centimetre**: Volume is measured in cubic centimetres eg. '1.0 cm³ = 0.000001 m³', and '1.0 m³ = 1000000 cm³'
- **millilitre**: Volume is measured in millilitres eg. '1.0 mL = 0.000001 m³', and '1.0 m³ = 1000000 mL'
- **cubic inch**: Volume is measured in cubic inches eg. '1.0 cu in = 0.00001638706400127079 m³', and '1.0 m³ = 61023.74409 cu in'
- **US gallon**: Volume is measured in US gallons eg. '1.0 US gals = 0.0037854117834002945 m³', and '1.0 m³ = 264.1720524 US gals'
- **imperial gallon**: Volume is measured in imperial gallons eg. '1.0 imp gals = 0.004546089999981147 m³', and '1.0 m³ = 219.9692483 imp gals'
### Speed
- **metre per second**: Speed is measured in metres per second eg. '1.0 m/s' (SI Unit)
- **knot**: Speed is measured in knots eg. '1.0 kn = 0.5144456333854638 m/s', and '1.0 m/s = 1.94384 kn'
- **mile per hour**: Speed is measured in miles per hour eg. '1.0 mph = 0.44703999999088756 m/s', and '1.0 m/s = 2.2369362921 mph'
- **kilometre per hour**: Speed is measured in kilometres per hour eg. '1.0 km/h = 0.2777777777777778 m/s', and '1.0 m/s = 3.6 km/h'
### Acceleration
- **metre per second squared**: Acceleration is measured in metres per second squared eg. '1.0 m/s²' (SI Unit)
- **knot per second**: Acceleration is measured in knots per second eg. '1.0 kn/s = 0.5144456333854638 m/s²', and '1.0 m/s² = 1.94384 kn/s'
- **mile per hour per second**: Acceleration is measured in miles per hour per second eg. '1.0 mph/s = 0.44703999999088756 m/s²', and '1.0 m/s² = 2.2369362921 mph/s'
- **kilometre per hour per second**: Acceleration is measured in kilometres per hour per second eg. '1.0 km/hs = 0.2777777777777778 m/s²', and '1.0 m/s² = 3.6 km/hs'
- **foot per second squared**: Acceleration is measured in feet per second squared eg. '1.0 ft/s² = 0.3048000000012192 m/s²', and '1.0 m/s² = 3.280839895 ft/s²'
- **g-force**: Acceleration is measured in g-force eg. '1.0 𝑔 = 9.80665 m/s²', and '1.0 m/s² = 0.10197162129779283 𝑔'
### Density
- **kilogram per cubic metre**: Density is measured in kilograms per cubic metre eg. '1.0 kg/m³' (SI Unit)
- **gram per hundred millilitres**: Density is measured in grams per hundred millilitres eg. '1.0 g/(100mL) = 10 kg/m³', and '1.0 kg/m³ = 0.1 g/(100mL)'
- **gram litre**: Density is measured in grams per litre eg. '1.0 g/L = 1 kg/m³', and '1.0 kg/m³ = 1 g/L'
- **gram per millilitre**: Density is measured in grams per millilitre eg. '1.0 g/mL = 1000 kg/m³', and '1.0 kg/m³ = 0.001 g/mL'
### Molar Concentration
- **mole per cubic metre**: Molar Concentration is measured in moles per cubic metre eg. '1.0 mol/m³' (SI Unit)
- **mole per litre**: Molar Concentration is measured in moles per litre eg. '1.0 mol/L = 0.001 mol/m³', and '1.0 mol/m³ = 1000 mol/L'
- **mole per cubic decimetre**: Molar Concentration is measured in moles per cubic decimetre eg. '1.0 mol/dm³ = 0.001 mol/m³', and '1.0 mol/m³ = 1000 mol/dm³'
### Luminance
- **candela per square metre**: Luminance is measured in candelas per square metre eg. '1.0 cd/m²' (SI Unit)
### Torque
- **joule per radian**: Torque is measured in joules per radian eg. '1.0 J/rad' (SI Unit)
- **newton metre**: Torque is measured in newton metres eg. '1.0 Nm = 1 J/rad', and '1.0 J/rad = 1 Nm'
- **pound force foot**: Torque is measured in pound force feet eg. '1.0 lbf-ft = 1.355818935 J/rad', and '1.0 J/rad = 0.737561612531986 lbf-ft'
### Rotation
- **radian per second**: Rotation is measured in radians per second eg. '1.0 rad/s' (SI Unit)
- **degree per second**: Rotation is measured in degrees per second eg. '1.0 deg/s = 0.01745329251994336 rad/s', and '1.0 rad/s = 57.2957795130821 deg/s'
- **revolution per minute**: Rotation is measured in revolutions per minute eg. '1.0 rpm = 0.1047197551196601 rad/s', and '1.0 rad/s = 9.54929658551369 rpm'
### Angular Acceleration
- **radian per second squared**: Angular Acceleration is measured in radians per second squared eg. '1.0 rad/s²' (SI Unit)
- **degree per second squared**: Angular Acceleration is measured in degrees per second squared eg. '1.0 deg/s² = 0.01745329251994336 rad/s²', and '1.0 rad/s² = 57.2957795130821 deg/s²'
### Volumetric Flow
- **cubic metre per second**: Volumetric Flow is measured in cubic metres per second eg. '1.0 m³/s' (SI Unit)
- **US gallon per hour**: Volumetric Flow is measured in US gallons per hour eg. '1.0 US gal/h = 0.0000010515032733215406 m³/s', and '1.0 m³/s = 951019.3885 US gal/h'
- **imperial gallon per hour**: Volumetric Flow is measured in imperial gallons per hour eg. '1.0 imp gal/h = 0.0000012628027777406475 m³/s', and '1.0 m³/s = 791889.2939 imp gal/h'
- **litre per hour**: Volumetric Flow is measured in litres per hour eg. '1.0 L/h = 2.7777777777777776e-7 m³/s', and '1.0 m³/s = 3600000 L/h'
### Mass Flow
- **kilogram per second**: Mass Flow is measured in kilograms per second eg. '1.0 kg/s' (SI Unit)
- **pound per minute**: Mass Flow is measured in pounds per minute eg. '1.0 lbs/min = 0.0075598728339578035 kg/s', and '1.0 kg/s = 132.2773573 lbs/min'
- **kilogram per hour**: Mass Flow is measured in kilograms per hour eg. '1.0 kg/h = 0.0002777777777777778 kg/s', and '1.0 kg/s = 3600 kg/h'
### Pressure Rate
- **pascal per second**: Pressure Rate is measured in pascals per second eg. '1.0 Pa/s' (SI Unit)
- **pound per square inch per second**: Pressure Rate is measured in pounds per square inch per second eg. '1.0 psi/s = 6894.413789 Pa/s', and '1.0 Pa/s = 0.00014504496402514955 psi/s'
- **hectopascal per hour**: Pressure Rate is measured in hectopascals per hour eg. '1.0 hPa/h = 0.027777777777777776 Pa/s', and '1.0 Pa/s = 36 hPa/h'
- **millibar per hour**: Pressure Rate is measured in millibars per hour eg. '1.0 mbar/h = 0.027777777777777776 Pa/s', and '1.0 Pa/s = 36 mbar/h'
### Kinematic Viscosity
- **square metre per second**: Kinematic Viscosity is measured in square metres per second eg. '1.0 m²/s' (SI Unit)
- **square millimetre per second**: Kinematic Viscosity is measured in square millimetres per second eg. '1.0 mm²/s = 0.000001 m²/s', and '1.0 m²/s = 1000000 mm²/s'
- **centistoke**: Kinematic Viscosity is measured in centistokes eg. '1.0 cSt = 0.000001 m²/s', and '1.0 m²/s = 1000000 cSt'
### Dynamic Viscosity
- **pascal second**: Dynamic Viscosity is measured in pascal seconds eg. '1.0 Pa.s' (SI Unit)
- **centipoise**: Dynamic Viscosity is measured in centipoises eg. '1.0 cP = 0.001 Pa.s', and '1.0 Pa.s = 1000 cP'
- **millipascal second**: Dynamic Viscosity is measured in millipascal seconds eg. '1.0 mPa.s = 0.001 Pa.s', and '1.0 Pa.s = 1000 mPa.s'
### Sound Pressure
- **pascal**: Sound Pressure is measured in pascals eg. '1.0 Pa' (SI Unit)
- **decibel in air**: Sound Pressure is measured in decibels in air eg. '1.0 dB(Air) = 0.0002 Pa', and '1.0 Pa = 93.97940008672037 dB(Air)'
- **decibel in water**: Sound Pressure is measured in decibels in water eg. '1.0 dB(Water) = 0.00001 Pa', and '1.0 Pa = 120 dB(Water)'
### Noise
- **decibel(A-weighted)**: Noise is measured in decibels(A-weighted) eg. '1.0 dBA' (SI Unit)
### Absolute Humidity
- **gram per cubic metre**: Absolute Humidity is measured in grams per cubic metre eg. '1.0 g/m³' (SI Unit)
### Ratio
- **ratio**: Ratio is measured in ratio eg. '1.0' (SI Unit)
- **percent**: Ratio is measured in percent eg. '1.0% = 0.01', and '1.0 = 100%'
- **part per million**: Ratio is measured in parts per million eg. '1.0 ppm = 0.000001', and '1.0 = 1000000 ppm'
- **part per thousand**: Ratio is measured in parts per thousand eg. '1.0 ‰ = 0.001', and '1.0 = 1000 ‰'
- **acid number**: Ratio is measured in acid number eg. '1.0 mgKOH/g = 0.001', and '1.0 = 1000 mgKOH/g'
