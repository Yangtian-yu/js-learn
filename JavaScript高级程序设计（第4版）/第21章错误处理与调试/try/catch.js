function testFinally() {
  try {
    return 2;
  } catch (error) {
    return 1;
  } finally {
    return 0;
  }
}

console.log(testFinally());
try {
  let o = new 10();
} catch (error) {
  console.log(error);
} finally {
  console.log(1);
}
