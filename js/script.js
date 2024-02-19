const ticketButtons = document.getElementsByClassName("kbd-btn");
// get available-seat
let availableSeat = getElementByNumber("available-seat");
// get seat
let totalSeat = getElementByNumber("Seat");
// get per ticket price
const perTicketPrice = getElementByNumber("per-ticket-Price");
// get coupon btn
const CouponBtn = document.getElementById('Coupon-btn');
// number input passed
let passed = '';
for (const button of ticketButtons) {
  button.addEventListener("click", function (event) {
    const element = event.target;
    // set ticket button style
    element.classList.add("!bg-primary-color", "!text-white");
    element.setAttribute("disabled", true);

    // get button inner text
    const buttonText = element.innerText;

    // set tBody area
    const tbody = document.getElementById("tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <tr>
            <td>${buttonText}</td>
            <td>Economic</td>
            <td>${perTicketPrice}</td>
        </tr>
            `;
    tbody.appendChild(tr);
    // set available seat
    availableSeat -= 1;
    setElementById("available-seat", availableSeat);

    // set total seat
    totalSeat += 1;
    setElementById("Seat", totalSeat);
    // set per-ticket-Price

    const totalPrice = perTicketPrice * totalSeat;
    setElementById("total-price", totalPrice);

    // get only 4 ticket condition
    if (totalSeat === 4) {
      for (const button of ticketButtons) {
        button.setAttribute("disabled", true);
        
        CouponBtn.removeAttribute('disabled');
      }
    }


  //  number validation check Enabled modal button
    const passedNumber = parseInt(passed);
    if (!isNaN(passedNumber) && totalSeat  > 0) {
        const next = document.getElementById('next');
        next.removeAttribute('disabled');
    }
    

    // set grand-total
    setElementById("grand-total", totalPrice);
  });
}

function getElementByNumber(elementId) {
  const element = document.getElementById(elementId).innerText;
  const value = parseInt(element);
  return value;
}
function setElementById(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}

// get Coupon input

CouponBtn.addEventListener("click", function () {
  const CouponValue = document.getElementById("Coupon").value;
  const totalPrice = getElementByNumber("total-price");
  // check coupon code 
  if (CouponValue === "NEW15" || CouponValue === "Couple 20") {
    const discountContainer  = document.getElementById('discount-container');

       const div = document.createElement('div');
        div.classList.add('flex','justify-between', 'my-6');
        discountContainer.appendChild(div);
        this.parentNode.classList.add("hidden");
        // 15% discount coupon 
      if (CouponValue === "NEW15") {
        const discount =  totalPrice * (15 / 100);
        div.innerHTML = `<p>discount</p>
        <p>BDT <span id="total-price">${discount}</span></p>`;
        const totalDiscount = totalPrice - discount;
        setElementById("grand-total", totalDiscount);
      } 
      // 20% discount coupon 
      else {
        const discount =  totalPrice * (20 / 100);
        div.innerHTML = `<p>discount</p>
        <p>BDT <span id="total-price">${discount}</span></p>`;
        const totalDiscount = totalPrice - discount;
        setElementById("grand-total", totalDiscount);
      }
  } else {
    alert("give me a valid coupon code");
  }
});

// number validation check Enabled modal button
document.getElementById('number').addEventListener('keyup', function(e){
     passed = e.target.value;
    const passedNumber = parseInt(passed);
    if (!isNaN(passedNumber) && totalSeat  > 0) {
        const next = document.getElementById('next');
        next.removeAttribute('disabled');
    }
   
});