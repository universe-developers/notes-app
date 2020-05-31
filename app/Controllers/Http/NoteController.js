'use strict'
const { validate } = use('Validator')
const Note = use('App/Models/Note')

class NoteController {
    async index({ response, view }) {
        const notes = await Note.all();
        return view.render('welcome', { notes: notes.toJSON() })
    }

    async store({ request, response }) {
        const rules = {
            name: 'required',
            description: 'required'
        };

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            console.log(validation.messages())
            session
                .withErrors(validation.messages())
                .flashExcept(['password'])

            return response.redirect('back')
        }

        try {
            await Note.create({
                name: request.input('name'),
                description: request.input('description')
            })
            return response.redirect('/', 201)
        } catch (error) {
            return response.redirect('/', 403, error.message())
        }

    }
}

module.exports = NoteController