export default async (interaction, action, embed, components) => {
    try {
        add = (prevEmbed, ID) => {
            if (prevEmbed.fields.find(item => item.name === ID).value === 'None') {
                return prevEmbed.fields.find(item => item.name === ID).value = `<@${user.id}>`
            } else {
                return prevEmbed.fields.find(item => item.name === ID).value = `${prevEmbed.fields.find(item => item.name === ID).value} \n <@${user.id}>`
            }
        }
        move = (prevEmbed, ID) => {
            newValue = prevEmbed.fields.find(item => item.name === ID).value.replace(`<@${user.id}>`, '')
            if (newValue === '') newValue = 'None'
            return prevEmbed.fields.find(item => item.name === ID).value = newValue
        }
        remove = (prevEmbed, ID) => {
            newValue = prevEmbed.fields.find(item => item.name === ID).value.replace(`<@${user.id}>`, '')
            if (newValue === '') newValue = 'None'
            return prevEmbed.fields.find(item => item.name === ID).value = newValue
        }
        let prevEmbed = embed
        let user = interaction.member.user
        if (action) { //Member clicked YES button
            if (prevEmbed.fields.find(item => item.name === 'YES').value.includes(`<@${user.id}>`)) {
                remove(prevEmbed, 'YES')
            } else {
                if (prevEmbed.fields.find(item => item.name === 'NO').value.includes(`<@${user.id}>`)) {
                    move(prevEmbed, 'NO')
                }
                add(prevEmbed, 'YES')
            }
        } else { //Member clicked NO button
            if (prevEmbed.fields.find(item => item.name === 'NO').value.includes(`<@${user.id}>`)) {
                remove(prevEmbed, 'NO')
            } else {
                if (prevEmbed.fields.find(item => item.name === 'YES').value.includes(`<@${user.id}>`)) {
                    move(prevEmbed, 'YES')
                }
                add(prevEmbed, 'NO')
            }
        }
        await interaction.update({ embeds: [prevEmbed], components: [components] });
    } catch (err) {
        console.log(err)
    }
};