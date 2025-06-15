import { FONTS } from "@/constant";
import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { useTheme } from "../providers/ThemeContext";

const { width } = Dimensions.get("window");
const size = width * 0.8;
const strokeWidth = 14;
const radius = (size - strokeWidth) / 2;
const center = size / 2;
const gapAngle = 8; // degrees between segments

// Define segments
// const segments = [
//   { value: 2, color: "#52D96C" }, // green
//   { value: 1, color: "#0DE2B8" }, // mint
//   { value: 1, color: "#000000" }, // black
//   { value: 1, color: "#59DDAA" }, // light green
//   { value: 1, color: "#0AA0F7" }, // blue
//   { value: 1, color: "#A186F7" }, // purple
// ];

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const createArcPath = (startAngle: number, sweepAngle: number) => {
  const start = polarToCartesian(center, center, radius, startAngle);
  const end = polarToCartesian(center, center, radius, startAngle + sweepAngle);
  const largeArcFlag = sweepAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
};

interface CircularSegmentedChartProps {
  trip_name: string;
  trip_budget: number;
  segments: { value: number; color: string }[];
}

const CircularSegmentedChart: FC<CircularSegmentedChartProps> = ({
  trip_budget,
  trip_name,
  segments,
}) => {
  const { theme } = useTheme();

  let currentAngle = 0;
  // Total angle without gaps
  const totalValue = segments.reduce((sum, seg) => sum + seg.value, 0);
  const totalGaps = segments.length;
  const totalGapAngle = totalGaps * gapAngle;
  const usableAngle = 360 - totalGapAngle;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="0" origin={`${center}, ${center}`}>
          {segments.map((segment, index) => {
            const segmentAngle = (segment.value / totalValue) * usableAngle;
            const path = createArcPath(currentAngle, segmentAngle);
            const arc = (
              <Path
                key={index}
                d={path}
                stroke={`#${segment.color}`}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
              />
            );
            currentAngle += segmentAngle + gapAngle;
            return arc;
          })}
        </G>
      </Svg>

      {/* Center Content */}
      <View style={styles.centerText}>
        <Text style={[styles.label, { color: theme.PRIMARY }]}>
          {trip_name}
        </Text>
        <Text style={[styles.amount, { color: theme.PRIMARY }]}>
          {trip_budget}DH
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
  centerText: {
    position: "absolute",
    top: "38%",
    alignItems: "center",
  },
  label: {
    color: "black",
    fontSize: 25,
    fontFamily: FONTS.ClashDisplay.Bold,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: FONTS.LotaGrotesque.Regular,
    color: "#000",
  },
  month: {
    fontSize: 16,
    color: "#52D96C",
    marginTop: 6,
  },
});

export default CircularSegmentedChart;
