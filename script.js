// QuickCare JavaScript


// 1. Search Doctor
const doctorSearch = document.getElementById("doctorSearch");
const specializationFilter = document.getElementById("specializationFilter");
const doctorCards = document.querySelectorAll(".doctor-card");


function filterDoctors() {

    const searchText = doctorSearch.value.toLowerCase();
    const selectedSpecialization = specializationFilter.value;

    doctorCards.forEach(function(card) {

        const doctorName = card.getAttribute("data-name").toLowerCase();
        const specialization = card.getAttribute("data-specialization");

        const nameMatch = doctorName.includes(searchText);

        const specializationMatch =
            selectedSpecialization === "all" ||
            specialization === selectedSpecialization;

        if (nameMatch && specializationMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


// Search while typing
doctorSearch.addEventListener("input", filterDoctors);


// Filter by specialization
specializationFilter.addEventListener("change", filterDoctors);


// 2. Select Doctor

function selectDoctor(doctorName) {

    const doctorSelect = document.getElementById("doctor");

    doctorSelect.value = doctorName;

    document.getElementById("appointment").scrollIntoView({
        behavior: "smooth"
    });
}
// 3. Appointment Booking

const appointmentForm = document.getElementById("appointmentForm");
const appointmentDate = document.getElementById("appointmentDate");


// Don't allow previous dates
const today = new Date().toISOString().split("T")[0];
appointmentDate.setAttribute("min", today);


// When patient submits the form
appointmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get patient details
    const patientName = document.getElementById("patientName").value;
    const patientAge = document.getElementById("patientAge").value;
    const gender = document.getElementById("gender").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const reason = document.getElementById("reason").value;


    // Get old appointments
    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];


    // Check if same doctor, date and time is already booked
    const alreadyBooked = appointments.some(function(appointment) {

        return (
            appointment.doctor === doctor &&
            appointment.date === date &&
            appointment.time === time
        );

    });


    if (alreadyBooked) {

        alert(
            "Sorry! This time slot is already booked. Please select another time."
        );

        return;
    }


    // Generate appointment ID
    const appointmentId =
        "QC" + Math.floor(10000 + Math.random() * 90000);


    // Create appointment object
    const newAppointment = {

        id: appointmentId,
        patientName: patientName,
        age: patientAge,
        gender: gender,
        mobile: mobile,
        email: email,
        doctor: doctor,
        date: date,
        time: time,
        reason: reason,
        status: "Confirmed"

    };


    // Save appointment
    appointments.push(newAppointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    // Show confirmation
    alert(
        "Appointment booked successfully!\n\n" +
        "Appointment ID: " + appointmentId + "\n" +
        "Doctor: " + doctor + "\n" +
        "Date: " + date + "\n" +
        "Time: " + time
    );


    // Clear form
    appointmentForm.reset();

});