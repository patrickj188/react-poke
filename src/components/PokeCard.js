import React from "react";
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Container } from '@mantine/core';
import '../components/style/pokeCardStyle.css'


const PokeCard = ({name, img, species, description, onClick}) => {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
            <div className='pokeCard' style={{ width: 340, margin: 'auto' }}>
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Image src={img} alt="" />
                    </Card.Section>

                    <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.md }}>
                        <Text weight={500}>{name}</Text>
                        <Badge color="pink" variant="light">
                            {species}
                        </Badge>
                    </Group>

                    <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                        {description}
                    </Text>

                    <Button onClick={() =>{onClick(name)}} variant="light" color="blue" fullWidth style={{ marginTop: 14 } }>
                            Add to team
                        </Button>
                </Card>
            </div>

    )
}

export default PokeCard;