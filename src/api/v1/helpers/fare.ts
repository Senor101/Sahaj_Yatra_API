export function calculateFare(distance: number): number {
  let fare: number = 0
  if (distance > 0 && distance <= 5) {
    fare = 20
  } else if (distance > 5 && distance <= 10) {
    fare = 25
  } else if (distance > 10 && distance <= 15) {
    fare = 30
  } else if (distance > 15 && distance <= 20) {
    fare = 35
  } else {
    fare = distance * 2.5
  }
  return fare
}
