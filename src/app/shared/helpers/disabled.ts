export function disabledButton(event, test: string): void {
  event.target.innerHTML = 'done';
  event.target.disabled = true;
  setTimeout(() => {
    event.target.innerHTML = test;
    event.target.disabled = false;
  }, 2500);
}
