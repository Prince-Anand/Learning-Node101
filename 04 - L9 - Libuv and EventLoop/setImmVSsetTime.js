// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});


// Output is in random order and depends on cpu cz timeout is done after 1ms (nodejs treats it this way) so if cpu is fast then timeout first and if it is slow then it immediate is first
// If IO callback is there then setImmediate is always run first