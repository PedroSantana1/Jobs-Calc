 const Profile = require('../model/Profile')
 
 module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res) {
        // Pegar os dados
        const data = req.body
        // Definir semanas num ano = 52
        const weeksPerYear = 52
        // Remover as semanas de férias, para pegar em media quantas semanas tem um mes
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        // Total de horas trablhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        // Horas trabalhadas num mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        // Qual será o valor da hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ... profile,
            ...req.body,
            "value-hour": valueHour 
        })
        
        return res.redirect('/profile')
    }
}